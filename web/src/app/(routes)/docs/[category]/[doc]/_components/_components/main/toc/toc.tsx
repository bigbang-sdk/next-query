import { cn } from "@/shadcn/lib/utils";
import { NestedList } from "../../../_utils/extract-toc";
import { ListItem, TocClient } from "./toc-client";

function getHashList(items: NestedList[]): string[] {
  return items.flatMap((item) => [item.hash, ...getHashList(item.children || [])]);
}

export const Toc = ({ nestedList }: { nestedList: NestedList[] }) => {
  const hashList = getHashList(nestedList);

  return (
    <TocClient hashList={hashList}>
      <aside className="sticky top-24 h-[calc(100vh-6rem)] w-[16rem] overflow-y-auto border-l py-6 pl-5 pr-5 hidden lg:block">
        <p className="mb-2 text-sm font-semibold">On this page</p>
        <nav className="flex flex-col">
          <List items={nestedList} />
        </nav>
      </aside>
    </TocClient>
  );
};

const List = ({ items, depth = 0 }: { items: NestedList[]; depth?: number }) => (
  <>
    {items.map((item) => (
      <div
        key={item.hash}
        className={cn("flex flex-col", depth > 0 && "ml-3")}
      >
        <ListItem item={item} />

        {item.children?.length > 0 && (
          <List
            items={item.children}
            depth={depth + 1}
          />
        )}
      </div>
    ))}
  </>
);
