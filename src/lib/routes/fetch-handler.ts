import { StreamProducer } from "../stream/stream-producer";
import { NDJSON } from "../utils/ndjson";
import { RequestOptions } from "../utils/types";

/**
 * POST `/api/next-query/fetch`
 *
 * @param req – must contain JSON `{ url: string; options?: RequestOptions }`
 * @param revalidateTag – Next.js cache tag invalidation function
 */
export async function fetchHandler(req: Request, revalidateTag: (tag: string) => void): Promise<Response> {
  let payload: { url?: string; options?: RequestOptions };
  try {
    payload = await req.json();
  } catch {
    return NDJSON.errorResponse("Invalid JSON body", 400);
  }

  if (!payload.url) {
    return NDJSON.errorResponse("Missing required field: url", 400);
  }

  const producer = new StreamProducer(payload.url, payload.options ?? {}, revalidateTag);
  return producer.initiateStream();
}
