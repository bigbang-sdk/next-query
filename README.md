# Next Query

**Next Query** is a lightweight React hook for fetching streaming data in Next.js client components. It leverages Next.js’s built-in fetch cache to return any cached response immediately, then automatically fetches and returns the fresh response via a streaming interface.

## Features

- **Immediate cached response**: Returns the cached result (if any) without waiting.
- **Streaming updates**: Streams fresh data chunks as they arrive.
- **Automatic loading state**: `isLoading` is `true` until the first chunk (or error) arrives.
- **Error handling**: Captures and returns errors (non-abort) in the stream.
- **Abort control**: Imperatively stop the stream with the returned `stop()` function.

## Installation

Install via npm or yarn or bun:

```bash
npm install @bigbang-sdk/next-query
# or
yarn add @bigbang-sdk/next-query
# or
bun add @bigbang-sdk/next-query
```

## Usage

```tsx
import { useQuery } from "@bigbang-sdk/next-query";

interface Message {
  id: string;
  text: string;
}

export default function Chat() {
  const { data, error, isLoading, stop } = useQuery<Message[]>("/api/messages/stream", { headers: { "Content-Type": "application/json" } });

  if (isLoading) return <p>Loading messages...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={stop}>Stop Updates</button>
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

### `useQuery<T>(url: string, options?: RequestOptions)`

Returns an object with:

| Property    | Type            | Description                                                    |
| ----------- | --------------- | -------------------------------------------------------------- |
| `data`      | `T \| null`     | The latest data chunk or `null` if none received yet.          |
| `error`     | `Error \| null` | Any non-abort error encountered during streaming.              |
| `isLoading` | `boolean`       | `true` until the first chunk (or error) arrives, then `false`. |
| `stop`      | `() => void`    | Call to abort the stream immediately.                          |

### `RequestOptions`

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
2. Commit your changes using [Conventional Commits] (https://www.conventionalcommits.org/en) (`git commit -m "feat: add new feature"`)
3. Open a Pull Request

Please open issues for bug reports or feature requests.

## License

This project is [MIT Licensed](LICENSE).
