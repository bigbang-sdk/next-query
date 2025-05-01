/**
 * Decodes an NDJSON text stream into parsed objects.
 *
 * @template T The type of the `data` payload in each JSON line.
 */
export class StreamDecoder<T> {
  private buffer = "";

  /**
   * @param onData  Called for each successfully parsed `data` chunk.
   * @param onError Called for any parse error.
   */
  constructor(private readonly onData: (chunk: T) => void, private readonly onError: (err: Error) => void) {}

  /**
   * Feeds incoming text chunks into the decoder.
   * Automatically splits on `\n`, parses JSON, and dispatches callbacks.
   *
   * @param textStream A stream of decoded text chunks.
   */
  public async decode(body: ReadableStream<Uint8Array<ArrayBufferLike>>): Promise<void> {
    const textStream = body.pipeThrough(new TextDecoderStream());
    const reader = textStream.getReader();
    try {
      while (true) {
        const { value: chunk, done } = await reader.read();

        if (done) break;

        this.buffer += chunk!;
        const parts = this.buffer.split("\n");
        this.buffer = parts.pop()!;

        for (const line of parts) {
          if (!line.trim()) continue;
          let parsed: any;
          try {
            parsed = JSON.parse(line);
          } catch (e: any) {
            this.onError(new Error(`JSON parse error: ${e.message}`));
            continue;
          }
          if (parsed.success) {
            this.onData(parsed.data as T);
          } else {
            this.onError(new Error(parsed.error ?? "Unknown error"));
          }
        }
      }
      // flush remaining buffer
      if (this.buffer) {
        try {
          const parsed = JSON.parse(this.buffer);
          parsed.success ? this.onData(parsed.data as T) : this.onError(new Error(parsed.error ?? "Unknown error"));
        } catch (e: any) {
          this.onError(new Error(`JSON parse error: ${e.message}`));
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
