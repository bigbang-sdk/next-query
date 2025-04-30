import { RequestOptions } from "./utils/types";
import { StreamProducer } from "./stream/stream-producer";

type Handler = (req: Request) => Promise<Response>;

/**
 * Factory to create Next.js route handlers for `/api/next-query/[...all]`.
 *
 * @param revalidateTag - Function to invalidate a cache tag (from `next/cache`).
 * @returns An object with `GET` and `POST` handlers.
 */
export function routeHandler(revalidateTag: (tag: string) => void): {
  GET: Handler;
  POST: Handler;
} {
  return {
    GET: async (req: Request): Promise<Response> => {
      return errorResponse(`Endpoint not found`);
    },
    POST: async (req: Request): Promise<Response> => {
      const path = getPath(req);
      switch (path) {
        case "/fetch":
          return fetchHandler(req, revalidateTag);
        default:
          return errorResponse(`Endpoint not found`);
      }
    },
  };
}

/**
 * Handler for POST `/api/next-query/fetch`.
 * Expects a JSON body `{ url: string; options?: RequestOptions }`,
 * then streams the response as NDJSON and revalidates tags.
 *
 * @param req - The incoming Request.
 * @param revalidateTag - Cache revalidation function.
 * @returns A streaming NDJSON response or an error response.
 */
async function fetchHandler(req: Request, revalidateTag: (tag: string) => void): Promise<Response> {
  try {
    const { url, options = {} } = (await req.json()) as {
      url: string;
      options?: RequestOptions;
    };

    if (!url) {
      throw new Error("Missing required field: url");
    }

    const producer = new StreamProducer(url, options, revalidateTag);
    return producer.sendResponse({ status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    const status = msg.includes("Missing") ? 400 : 500;
    return errorResponse(msg, status);
  }
}

/**
 * Extracts the first sub-path segment after `/api/next-query` from the request URL.
 *
 * E.g. "/api/next-query/fetch/extra" → "/fetch/extra"
 *
 * @param req - The incoming Request.
 * @returns A string like "/fetch" or "/fetch/extra".
 */
function getPath(req: Request): string {
  const segments = new URL(req.url).pathname.split("/").filter(Boolean).slice(2);
  return `/${segments.join("/")}`;
}

/**
 * Creates a concise NDJSON error response.
 *
 * @param message - The error message to include.
 * @param status - HTTP status code (default: 404).
 * @returns A Response with a single-line JSON error and proper headers.
 */
function errorResponse(message: string, status = 404): Response {
  const body = JSON.stringify({ success: false, error: message }) + "\n";
  return new Response(body, {
    status,
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
    },
  });
}
