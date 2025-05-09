export type Doc = {
  docTitle: string;
  docSlug: string;
  docDescription?: string;
  requireCanvasProvider?: boolean;
};

export type DocCategory = {
  categoryTitle: string;
  categorySlug: string;
  docs: Doc[];
};

export type DocList = DocCategory[];

export const docList: DocList = [
  {
    categoryTitle: "Getting Started",
    categorySlug: "getting-started",
    docs: [
      {
        docTitle: "Overview",
        docSlug: "overview",
        docDescription: "What is Next Query?",
        requireCanvasProvider: true,
      },
      {
        docTitle: "Installation",
        docSlug: "installation",
        docDescription: "How to install Next Query in your project",
      },
      {
        docTitle: "Quick Start",
        docSlug: "quick-start",
        docDescription: "How to get started with Next Query",
      },
    ],
  },
  {
    categoryTitle: "Functions",
    categorySlug: "functions",
    docs: [
      {
        docTitle: "serverQuery",
        docSlug: "server-query",
        docDescription: "How to use serverQuery in your project",
      },
      {
        docTitle: "clientQuery",
        docSlug: "client-query",
        docDescription: "How to use clientQuery in your project",
      },
    ],
  },
  {
    categoryTitle: "Guides",
    categorySlug: "guides",
    docs: [
      {
        docTitle: "Server (fresh data)",
        docSlug: "server-fresh-data",
        docDescription: "How to fetch on server with fresh data",
      },
      {
        docTitle: "Server (cached data)",
        docSlug: "server-cached-data",
        docDescription: "How to fetch on server with cached data",
      },
      {
        docTitle: "Client (fresh data)",
        docSlug: "client-fresh-data",
        docDescription: "How to fetch on client with fresh data",
      },
      {
        docTitle: "Client (cached data)",
        docSlug: "client-cached-data",
        docDescription: "How to fetch on client with cached data",
      },
      {
        docTitle: "Client (SWR)",
        docSlug: "client-swr",
        docDescription: "How to fetch on client with SWR",
      },
      {
        docTitle: "Server + Client (SWR)",
        docSlug: "server-and-client-swr",
        docDescription: "How to fetch on server and client with SWR",
      },
    ],
  },
  {
    categoryTitle: "Concepts",
    categorySlug: "concepts",
    docs: [
      {
        docTitle: "Cache Revalidation",
        docSlug: "cache-revalidation",
        docDescription: "How to revalidate cache",
      },
      {
        docTitle: "Pagination",
        docSlug: "pagination",
        docDescription: "How to paginate your data",
      },
      {
        docTitle: "Infinite Queries",
        docSlug: "infinite-queries",
        docDescription: "How to use infinite queries in your project",
      },
      {
        docTitle: "Types and Schema",
        docSlug: "types-and-schema",
        docDescription: "How to use types and schema in your project",
      },
      {
        docTitle: "Dependent Queries",
        docSlug: "dependent-queries",
        docDescription: "How to use dependent queries in your project",
      },
      {
        docTitle: "Placeholder Data",
        docSlug: "placeholder-data",
        docDescription: "How to use placeholder data in your project",
      },
    ],
  },
];

export const allDocsPaths = () => {
  return docList
    .map((category) => {
      return category.docs.map((doc) => {
        return `/${category.categorySlug}/${doc.docSlug}`;
      });
    })
    .flat();
};
