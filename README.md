# Introduction

**Next Query** is a React hook for fetching data in Next.js client components using SWR (Stale-While-Revalidate), leveraging Next.js’s built-in fetch cache.

When a request is made through Next Query, the client immediately receives a **cached response**. Then, Next Query automatically **revalidates** the data by fetching a **fresh response** in the background.

With a single hook, you can now use Next.js’s built-in fetch cache—previously available only in Server Components—within Client Components as well.

- **Fast**, **lightweight** and **reusable** data fetching
- Leverages Next.js's built-in fetch **cache**
- **Real-time** experience
- Automatic Revalidation
- TypeScript

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

Next Query uses API route handlers in the background to handle requests and perform revalidations.

To handle API requests for fetches, you need to set up a route handler in your Nextjs project.

Create a new file or route in your project's designated catch-all route handler. This route should handle requests for the path /api/next-query/\*

`Path: /app/api/next-query/[...all]/route.ts`

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
  const { data, error, isCacheLoading, isFreshLoading, isLoading } = useQuery("https://example.com/");

  if (error) return <p>Something went wrong</p>;
  if (isCacheLoading) return <p>Loading messages...</p>;

  return <div>hello {data.name}</div>;
}
```

In this example, useQuery accepts a url to fetch.

Next Query returns 5 values: `data`, `error`, `CacheLoading`, `isFreshLoading` and `isLoading`. When the request is not yet finished, `data` will be null and all loading states will be true. When we get a cached response, it sets `data` and `error` based on the result of fetch and `isCacheLoading` to false. Next Query then revalidates the cache for the query. If the fresh data is not the same as cached data, it sets `data` with the fresh data. If the fresh data is the same, it does not update `data`. Finally, both `isFreshLoading` & `isLoading` are set to false after revalidation.

## API

```tsx
import { useQuery, RequestOptions } from "@bigbang-sdk/next-query";

const options: RequestOptions = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ foo: "bar" }),
};

const { data, error, isCacheLoading, isFreshLoading, isLoading } = useQuery("https://example.com/", options);
```

### Parameters

- `url`: the url for the fetch request
- `options`: <em>(optional)</em> an object for request options

### Return Values

- `data`: the latest data value or `null` if none received yet
- `error`: any error encountered during fetch
- `isCacheLoading`: `true` until the cached data arrives, then `false`
- `isFreshLoading`: `true` until the fresh data arrives, then `false`
- `isLoading`: `true` until both cached and fresh data arrives, then `false`

### Options

- `method`: <em>(optional)</em> by default, useQuery() makes a GET request, but you can use the method option to use a different request method
- `headers`: <em>(optional)</em> you can set the request headers for the request
- `body`: <em>(optional)</em> you can send a body object with request inside JSON.stringify function

## Contributing

1. Fork the repository
2. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/en) (`git commit -m "feat: add new feature"`)
3. Open a Pull Request on the `dev` branch

Please open issues for bug reports or feature requests.

## License

This project is [MIT Licensed](LICENSE).
