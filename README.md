# Next Query

**Next Query** is a React hook for fetching data in Next.js client components using SWR, leveraging the Next.js’s built-in fetch cache. It first returns any cached response immediately, then automatically fetches and returns the fresh response after revalidation.

## Features

- **Immediate cached response**: Returns the cached result (if any) from Next.js fetch cache.
- **Fresh response after revalidation**: Revalidates the cache and sends the fresh response.
- **Automatic loading state**: `isLoading` is `true` until the first cached result arrives.
- **Error handling**: Captures and returns errors in the stream.

## Installation

### 1. Install the Package

Start by adding Next Query to your project:

```bash
npm install @bigbang-sdk/next-query
# or
yarn add @bigbang-sdk/next-query
# or
bun add @bigbang-sdk/next-query
```

### 2. Mount Handler

To handle API requests for fetches, you need to set up a route handler in your Nextjs project.

Create a new file or route in your project's designated catch-all route handler. This route should handle requests for the path /api/next-query/\*

`Folder Path: /app/api/next-query/[...all]/route.ts`

```tsx
import { revalidateTag } from "next/cache";
import { routeHandler } from "@bigbang-sdk/next-query";

export const { GET, POST } = routeHandler(revalidateTag);
```

## Usage

Start by using the `useQuery` hook in your client components. Make sure to include "use client" at the top of your file.

`data` will update twice: first with cached data, and then with fresh data.

```tsx
"use client";
import { useQuery } from "@bigbang-sdk/next-query";

export default function Chat() {
  const { data, error, isLoading } = useQuery("https://example.com/");

  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <ul>
        {data?.map((msg) => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
}
```

## API

`useQuery(url: string, options?: RequestOptions)`

Returns an object with:

| Property    | Type            | Description                                                    |
| ----------- | --------------- | -------------------------------------------------------------- |
| `data`      | `T \| null`     | The latest data value or `null` if none received yet.          |
| `error`     | `Error \| null` | Any error encountered during streaming.                        |
| `isLoading` | `boolean`       | `true` until the first chunk (or error) arrives, then `false`. |

### RequestOptions

This is just a wrapper around the standard [Fetch API options](https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch). You can pass headers, method, body, etc. Example:

```ts
import type { RequestOptions } from "@bigbang-sdk/next-query";

const opts: RequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ foo: "bar" }),
};
```

## Contributing

1. Fork the repository
2. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en) (`git commit -m "feat: add new feature"`)
3. Open a Pull Request on the `dev` branch

Please open issues for bug reports or feature requests.

## License

This project is [MIT Licensed](LICENSE).
