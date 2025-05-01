import { fetchHandler } from "./routes/fetch-handler";
import { parseErrorMessage } from "./utils/error";
import { NDJSON } from "./utils/ndjson";

type Handler = (req: Request) => Promise<Response>;

/**
 * Factory to wire up GET & POST routes for `/api/next-query/[...all]`.
 *
 * @param revalidateTag – Next.js cache tag invalidation function
 */
export function routeHandler(revalidateTag: (tag: string) => void) {
  const getRoutes: Record<string, Handler> = {};

  const postRoutes: Record<string, Handler> = {
    fetch: (req) => fetchHandler(req, revalidateTag),
  };

  return {
    GET: (req: Request) => dispatch(req, getRoutes, "GET"),
    POST: (req: Request) => dispatch(req, postRoutes, "POST"),
  };
}

/**
 * Given a request and a dispatch table, returns a response.
 *
 * @param req – HTTP request
 * @param table – mapping of sub-paths to handlers
 * @param method – HTTP method
 */
async function dispatch(req: Request, table: Record<string, Handler>, method: string): Promise<Response> {
  const segments = new URL(req.url).pathname.split("/").filter(Boolean).slice(2); // remove ["api","next-query"]
  const key = segments.join("/") || ""; // "" for root

  const handler = table[key];
  if (!handler) {
    const code = method === "GET" ? 405 : 404;
    return NDJSON.errorResponse(`Endpoint not found`, code);
  }
  try {
    return await handler(req);
  } catch (err: unknown) {
    const errorMessage = parseErrorMessage(err);
    return NDJSON.errorResponse(errorMessage, 500);
  }
}
