import type { RequestOptions } from "../utils/types";

/**
 * Splits a text stream into individual lines.
 * @returns A TransformStream that emits complete lines (without newline characters).
 */
function createLineSplitter(): TransformStream<string, string> {
  let buffer = "";
  return new TransformStream<string, string>({
    transform(chunk, controller) {
      buffer += chunk;
      const parts = buffer.split("\n");
      buffer = parts.pop()!; // last part is incomplete
      for (const line of parts) {
        controller.enqueue(line);
      }
    },
    flush(controller) {
      if (buffer) {
        controller.enqueue(buffer);
      }
    },
  });
}

/**
 * Subscribes to a server-sent NDJSON stream at `/api/stream`, forwarding parsed chunks.
 *
 * @template T The type of the `data` payload in each JSON line.
 */
export class StreamSubscriber<T> {
  private readonly controller = new AbortController();
  private readonly apiPath = "/api/next-query/fetch";

  /**
   * @param url       The remote URL to be fetched by the stream producer.
   * @param onData    Called for each successfully parsed `data` chunk.
   * @param onError   Called for any non-abort error (network, parse, etc.).
   * @param options   Optional fetch init (method, headers, body, etc.) forwarded to the producer.
   */
  constructor(private readonly url: string, private readonly onData: (chunk: T) => void, private readonly onError: (err: Error) => void, private readonly options?: RequestOptions) {}

  /**
   * Begins reading the NDJSON stream.
   * Resolves when the stream ends, or rejects on an uncaught error.
   */
  public async start(): Promise<void> {
    try {
      const res = await fetch(this.apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: this.url, options: this.options ?? {} }),
        signal: this.controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Stream request failed: ${res.status} ${res.statusText}`);
      }
      if (!res.body) {
        throw new Error("Streaming not supported by this browser");
      }

      // Decode bytes → text → split into lines
      const textStream = res.body.pipeThrough(new TextDecoderStream()).pipeThrough(createLineSplitter());

      const reader = textStream.getReader();
      try {
        while (true) {
          const { value: line, done } = await reader.read();
          if (done) break;
          if (!line.trim()) continue;

          let parsed: any;
          try {
            parsed = JSON.parse(line);
          } catch (parseErr: any) {
            this.onError(new Error(`JSON parse error: ${parseErr.message}`));
            continue;
          }

          // Expecting `{ success: boolean; data?: T; error?: string }`
          if (parsed.success) {
            this.onData(parsed.data as T);
          } else {
            this.onError(new Error(parsed.error ?? "Unknown error"));
          }
        }
      } finally {
        reader.releaseLock();
      }
    } catch (err: any) {
      if (err.name !== "AbortError") {
        this.onError(err);
      }
    }
  }

  /**
   * Stops the stream by aborting the request.
   */
  public stop(): void {
    this.controller.abort();
  }
}
