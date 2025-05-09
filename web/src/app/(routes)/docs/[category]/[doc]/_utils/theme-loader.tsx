"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";

export const HighlightThemeLoader = () => {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const linkId = "hljs-theme-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const href = resolvedTheme === "dark" ? "/highlight/github-dark.css" : "/highlight/github.css";

    if (link.href !== location.origin + href) {
      link.href = href;
    }
  }, [resolvedTheme]);

  return null;
};
