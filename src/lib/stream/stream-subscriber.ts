import type { RequestOptions } from "../utils/types";
import { StreamDecoder } from "./stream-decoder";

/**
 * Subscribes to a server-sent NDJSON stream at `/api/next-query/fetch`,
 * forwarding parsed chunks via a StreamDecoder.
 *
 * @template T The type of the `data` payload in each JSON line.
 */
export class StreamSubscriber<T> {
  private readonly controller = new AbortController();
  private readonly handlerPath = "/api/next-query/fetch";

  constructor(private readonly url: string, private readonly onData: (chunk: T) => void, private readonly onError: (err: Error) => void, private readonly onComplete: () => void, private readonly options?: RequestOptions) {}

  /** Begin the fetch + decode pipeline. */
  public async start(): Promise<void> {
    try {
      const body = await this.resolveFetch(this.url, this.options);
      const decoder = new StreamDecoder<T>(this.onData, this.onError);

      await decoder.decode(body);

      // ✅ trigger onCompleted when decoding is done
      this.onComplete();
    } catch (err: any) {
      if (err.name !== "AbortError") this.onError(err);
    }
  }

  private async resolveFetch(url: string, options?: RequestOptions): Promise<ReadableStream<Uint8Array<ArrayBufferLike>>> {
    const res = await fetch(this.handlerPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, options }),
    });
    if (!res.ok) throw new Error(`Stream request failed: ${res.status} ${res.statusText}`);
    if (!res.body) throw new Error("Streaming not supported by this browser");
    return res.body;
  }

  /** Stops the stream. */
  public stop(): void {
    this.controller.abort();
  }
}
