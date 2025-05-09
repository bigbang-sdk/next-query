import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { injectIds } from "./inject-ids";
import { extractToc } from "./extract-toc";
import { docList } from "@/main/docs/docs-list";
import { DocCategory } from "@/main/docs/docs-list";
import { Doc } from "@/main/docs/docs-list";
import { notFound } from "next/navigation";
import mdxComponents from "@/main/components/mdx";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export async function loadMdx({ category, doc }: { category: string; doc: string }) {
  const docCategory = docList.find((docCategory: DocCategory) => docCategory.categorySlug === category) || notFound();
  const docItem = docCategory.docs.find((docItem: Doc) => docItem.docSlug === doc) || notFound();

  let filePath = path.join(process.cwd(), `src/main/docs/${category}/${doc}.mdx`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), `src/main/docs/coming-soon.mdx`);
  }

  const source = fs.readFileSync(filePath, "utf8");

  const { nestedList } = await extractToc(source);

  const { content } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [injectIds, rehypeHighlight] },
    },
  });

  return { docItem, content, nestedList };
}
