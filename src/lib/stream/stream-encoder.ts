/**
 * Streams text chunks as UTF-8 Uint8Arrays, with built-in backpressure.
 */
export class StreamEncoder {
  /** Readable side emitting Uint8Array chunks. */
  public readonly stream: ReadableStream<Uint8Array>;
  /** Resolves when the stream is closed. */
  public readonly closed: Promise<void>;

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
    this.closed = this.writer.closed;
  }

  /**
   * Enqueue a text chunk. Returns once backpressure allows.
   */
  send(chunk: string): Promise<void> {
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

  /**
   * Wraps this.stream into a Fetch API Response.
   * @param init Optional ResponseInit (headers, status, etc.)
   */
  toResponse(init?: ResponseInit): Response {
    const headers = new Headers(init?.headers);
    headers.set("Content-Type", "application/x-ndjson; charset=utf-8");
    return new Response(this.stream, { ...init, headers });
  }
}
