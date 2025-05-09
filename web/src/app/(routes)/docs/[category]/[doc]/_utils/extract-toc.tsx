import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import remarkRehype from "remark-rehype";
import { visit } from "unist-util-visit";
import type { Root as HASTRoot, Element as HASTElement } from "hast";
import { getHash } from "@/main/utils/hash";

export type NestedList = {
  text: string | null;
  hash: string;
  children: NestedList[];
};

function extractText(children: HASTElement["children"]): string {
  return children
    .filter((c): c is { type: "text"; value: string } => c.type === "text" && "value" in c)
    .map((c) => c.value)
    .join("")
    .trim();
}

export async function extractToc(source: string): Promise<{ nestedList: NestedList[] }> {
  const nestedList: NestedList[] = [];

  const processor = unified()
    .use(remarkParse)
    .use(remarkMdx)
    .use(remarkRehype)
    .use(() => (tree: HASTRoot) => {
      let currentH2: NestedList | null = null;
      let currentH3: NestedList | null = null;
      let lastTag: "h2" | "h3" | "h4" | null = null;

      const pushCurrentH2 = () => {
        if (currentH2) {
          if (currentH3) currentH2.children.push(currentH3);
          nestedList.push(currentH2);
        }
        currentH2 = null;
        currentH3 = null;
      };

      visit(tree, "element", (node: HASTElement) => {
        const { tagName, children = [] } = node;

        if (!["h2", "h3", "h4"].includes(tagName)) return;

        const text = extractText(children);
        const hash = getHash(text);

        if (tagName === "h2") {
          pushCurrentH2();
          currentH2 = { text, hash, children: [] };
        } else if (tagName === "h3" && currentH2) {
          if (currentH3 && (lastTag === "h3" || lastTag === "h4")) {
            currentH2.children.push(currentH3);
          }
          currentH3 = { text, hash, children: [] };
        } else if (tagName === "h4" && currentH3) {
          currentH3.children.push({ text, hash, children: [] });
        }

        lastTag = tagName as typeof lastTag;
      });

      pushCurrentH2();
    });

  await processor.run(processor.parse(source));

  return { nestedList };
}
