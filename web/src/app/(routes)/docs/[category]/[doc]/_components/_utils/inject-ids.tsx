import { visit } from "unist-util-visit";
import type { Root, RootContent } from "hast";
import { getHash } from "@/main/utils/hash";

export const injectIds = () => {
  const savedHashes: string[] = [];

  return (tree: Root) => {
    visit(tree, "element", (node) => {
      if (!["h2", "h3", "h4"].includes(node.tagName)) return;
      const textNode = node.children?.find((c: { type: string }) => c.type === "text");
      const text = textNode && "value" in textNode ? textNode.value : "";
      if (!text) return;
      const hash = makeHash(text, savedHashes);
      savedHashes.push(hash);

      node.properties = {
        ...(node.properties || {}),
        id: hash,
        className: ["scroll-mt-30"],
      };
    });

    const newChildren: Node[] = [];
    const stack: { level: number; container: Element }[] = [];

    function closeTo(level: number) {
      while (stack.length && stack[stack.length - 1].level >= level) {
        const { container } = stack.pop()!;
        if (stack.length) {
          (stack[stack.length - 1].container.children as unknown as Node[]).push(container);
        } else {
          newChildren.push(container);
        }
      }
    }

    for (const node of tree.children) {
      if (node.type === "element" && /^h([2-4])$/.test(node.tagName)) {
        const level = parseInt(RegExp.$1, 10);
        closeTo(level);
        const div = {
          type: "element",
          tagName: "div",
          properties: { className: [`mdx-level-${level}`] },
          children: [node],
        } as unknown as Element;

        stack.push({ level, container: div });
      } else {
        if (stack.length) {
          (stack[stack.length - 1].container.children as unknown as Node[]).push(node as unknown as Node);
        } else {
          newChildren.push(node as unknown as Node);
        }
      }
    }

    closeTo(0);
    tree.children = newChildren as unknown as RootContent[];
  };
};

export const makeHash = (text: string, savedHashes: string[]): string => {
  let index = 0;
  const hash = getHash(text);
  if (savedHashes.includes(hash)) {
    index++;
    return makeHash(text + index, savedHashes);
  }
  return hash;
};
