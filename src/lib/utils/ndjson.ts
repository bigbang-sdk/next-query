export const NDJSON = {
  HEADERS: { "Content-Type": "application/x-ndjson; charset=utf-8" },
  errorResponse: (message: string, status: number = 404) => {
    return new Response(`${JSON.stringify({ success: false, error: message })}\n`, {
      status,
      headers: NDJSON.HEADERS,
    });
  },
};
