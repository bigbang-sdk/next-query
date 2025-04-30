import type { RequestOptions } from "./utils/types";
import { StreamProducer } from "./stream/stream-producer";

/**
 * Returns an object mapping HTTP methods to handlers that stream a two-phase fetch.
 *
 * @param revalidateTag - Callback to bust cache after the first fetch, receives the cache tag.
 * @returns An object with HTTP method handlers (e.g. POST).
 */
export function routeHandler(revalidateTag: (tag: string) => void): {
  POST: (req: Request) => Promise<Response>;
} {
  return {
    /**
     * POST /…
     * Expects JSON `{ url: string; options?: RequestOptions }`.
     * Streams two JSON fetches (pre- and post-invalidation) as NDJSON.
     *
     * @param req - The incoming Request.
     * @returns A Response streaming NDJSON or a single-line error NDJSON.
     */
    POST: async (req: Request): Promise<Response> => {
      try {
        const { url, options = {} } = (await req.json()) as {
          url: string;
          options?: RequestOptions;
        };

        if (!url) {
          throw new Error("Missing required field: url");
        }

        const producer = new StreamProducer(url, options, revalidateTag);
        // Wraps the ReadableStream and sets NDJSON headers
        return producer.toResponse({ status: 200 });
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        const status = msg.includes("Missing") ? 400 : 500;
        // Return a single JSON-per-line error payload
        return new Response(JSON.stringify({ success: false, error: msg }) + "\n", {
          status,
          headers: { "Content-Type": "application/x-ndjson; charset=utf-8" },
        });
      }
    },
  };
}
