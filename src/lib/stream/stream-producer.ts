import { StreamEncoder } from "./stream-encoder";
import { RequestOptions, RequestResponse } from "../utils/types";

/**
 * Streams two rounds of JSON fetches (pre- and post-invalidation) as NDJSON over a ReadableStream.
 *
 * @template T The expected shape of the JSON response body.
 */
export class StreamProducer<T = unknown> {
  /** Base36-encoded FNV-1a hash of the URL, used as a cache tag. */
  public readonly tag: string;
  /** ReadableStream producing UTF-8 Uint8Array chunks of NDJSON. */
  public readonly stream: ReadableStream<Uint8Array>;
  /** Resolves when the stream has been closed. */
  public readonly closed: Promise<void>;

  private readonly encoder: StreamEncoder;
  private readonly abortController = new AbortController();

  /**
   * @param url         The endpoint to fetch.
   * @param options     Standard fetch() init options (method, headers, body, etc.).
   * @param invalidate  Callback to bust cache: called with the generated tag.
   */
  constructor(private readonly url: string, private readonly options: RequestOptions = {}, private readonly invalidate: (tag: string) => void) {
    this.tag = StreamProducer.generateTag(url);
    this.encoder = new StreamEncoder();
    this.stream = this.encoder.stream;
    this.closed = this.encoder.closed;

    // Begin the two-phase fetch
    this.run().catch((err) => {
      console.error("StreamProducer error:", err);
      this.abort(err);
    });
  }

  /**
   * Abort any in-flight fetch and tear down the stream.
   *
   * @param reason Optional error or reason for aborting.
   */
  public abort(reason?: any): void {
    this.abortController.abort(reason);
    this.encoder.abort(reason);
  }

  /**
   * Wrap the internal stream into a Fetch API Response (NDJSON + backpressure).
   *
   * @param init Optional ResponseInit overrides (status, headers, etc.).
   * @returns A Readable-stream-based Response.
   */
  public sendResponse(init: ResponseInit = {}): Response {
    return this.encoder.sendResponse(init);
  }

  /**
   * Generate a stable tag from a string using FNV-1a (32-bit) → base36.
   *
   * @param input The string to hash (e.g. URL).
   * @returns An 8-character base36 hash.
   */
  private static generateTag(input: string): string {
    let hash = 0x811c9dc5;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(36).padStart(8, "0");
  }

  /**
   * Fetch JSON from the URL with force-cache + tag, respecting any abort signal.
   *
   * @throws If the response is not ok or is aborted.
   * @returns The parsed JSON body as T.
   */
  private async processFetch(): Promise<T> {
    const res = await fetch(this.url, {
      signal: this.abortController.signal,
      cache: "force-cache",
      next: { tags: [this.tag] },
      ...this.options,
    });
    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  /**
   * Perform the two-phase fetch cycle:
   *   1. initial fetch → stream
   *   2. invalidate cache
   *   3. second fetch → stream
   *
   * Always closes the encoder when done (or on error).
   */
  private async run(): Promise<void> {
    try {
      const first = await this.processFetch();
      await this.sendChunk({ success: true, data: first });

      this.invalidate(this.tag);

      const second = await this.processFetch();
      await this.sendChunk({ success: true, data: second });
    } catch (err: any) {
      await this.sendChunk({ success: false, error: err.message });
    } finally {
      await this.encoder.close();
    }
  }

  /**
   * Serialize a payload as NDJSON (one JSON object per line) and enqueue it.
   *
   * @param msg The payload to send over the stream.
   */
  private sendChunk(msg: RequestResponse): Promise<void> {
    return this.encoder.sendChunk(JSON.stringify(msg) + "\n");
  }
}
