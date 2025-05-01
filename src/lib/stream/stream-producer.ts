import { RequestOptions, RequestResponse } from "../utils/types";
import { StreamEncoder } from "./stream-encoder";
import { parseErrorMessage } from "../utils/error";
import { getHash } from "../utils/hash";

/**
 * Streams two fetches (pre- and post-invalidation) as NDJSON.
 *
 * @template T The expected JSON shape.
 */
export class StreamProducer<T = unknown> {
  /** Base36 FNV-1a hash of the URL for tagging. */
  public readonly tag: string;

  private readonly encoder = new StreamEncoder();
  private readonly controller = new AbortController();
  private readonly init: RequestOptions;

  /**
   * @param url         The endpoint to fetch.
   * @param options     Fetch options (method, headers, body, etc.).
   * @param invalidate  Cache-busting callback.
   */
  constructor(private readonly url: string, options: RequestOptions = {}, private readonly invalidate: (tag: string) => void) {
    this.tag = getHash(url);

    // Prepare fetch init once
    this.init = {
      ...options,
      signal: this.controller.signal,
      cache: "force-cache",
      next: { tags: [this.tag] },
    };

    // Kick off the two-phase stream
    this.run();
  }

  /** Orchestrates: fetch → invalidate → fetch → close. */
  private async run(): Promise<void> {
    try {
      const cachedData = await this.resolveFetch();
      await this.sendChunk({ success: true, data: cachedData });

      this.invalidate(this.tag);

      const freshData = await this.resolveFetch();
      const isEqual = JSON.stringify(cachedData) === JSON.stringify(freshData);

      if (!isEqual) {
        await this.sendChunk({ success: true, data: freshData });
      }
    } catch (err: unknown) {
      await this.sendChunk({ success: false, error: parseErrorMessage(err) });
    } finally {
      this.encoder.close();
    }
  }

  /** Resolves fetch request. */
  private async resolveFetch(): Promise<T> {
    const res = await fetch(this.url, this.init);
    if (!res.ok) {
      throw new Error(`Fetch error: ${res.status} ${res.statusText}`);
    }
    return res.json();
  }

  /** Serializes and enqueues one NDJSON line. */
  private sendChunk(msg: RequestResponse): Promise<void> {
    return this.encoder.sendChunk(`${JSON.stringify(msg)}\n`);
  }

  /**
   * Wraps the internal stream in a Fetch Response (NDJSON + headers).
   */
  public initiateStream(): Response {
    return this.encoder.initiateStream();
  }

  /**
   * Abort any in-flight fetch and close the stream.
   */
  public abort(reason?: unknown): void {
    this.controller.abort(reason);
    this.encoder.abort(reason);
  }
}
