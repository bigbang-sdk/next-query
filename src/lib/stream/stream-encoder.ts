import { NDJSON } from "../utils/ndjson";

/**
 * Streams text chunks as UTF-8 Uint8Arrays, with built-in backpressure.
 */
export class StreamEncoder {
  /** Readable side emitting Uint8Array chunks. */
  public readonly stream: ReadableStream<Uint8Array>;
  /** Writer side accepting text chunks. */
  private writer: WritableStreamDefaultWriter<string>;
  /**
   * @param encoder Optional TextEncoder (defaults to utf-8).
   */
  constructor(private encoder: TextEncoder = new TextEncoder()) {
    const { readable, writable } = new TransformStream<string, Uint8Array>({
      transform(chunk, controller) {
        controller.enqueue(encoder.encode(chunk));
      },
    });

    this.stream = readable;
    this.writer = writable.getWriter();
  }

  /**
   * Sends stream as a Fetch API Response.
   */
  initiateStream(): Response {
    return new Response(this.stream, {
      status: 200,
      headers: NDJSON.HEADERS,
    });
  }

  /**
   * Enqueue a text chunk. Returns once backpressure allows.
   */
  sendChunk(chunk: string): Promise<void> {
    return this.writer.write(chunk);
  }

  /**
   * Gracefully close the stream (signals EOF).
   */
  close(): Promise<void> {
    return this.writer.close();
  }

  /**
   * Immediately abort the stream with an optional reason.
   */
  abort(reason?: any): void {
    this.writer.abort(reason);
  }
}
