"use client";

import { useEffect } from "react";
import "highlight.js/styles/github.css";
import "highlight.js/styles/github-dark.css";
import { useSafeTheme } from "@/main/wrappers/theme-provider";

export const HighlightThemeLoader = () => {
  const { theme } = useSafeTheme();

  useEffect(() => {
    const linkId = "hljs-theme-link";
    let link = document.getElementById(linkId) as HTMLLinkElement | null;

    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }

    const href = theme === "dark" ? "/highlight/github-dark.css" : "/highlight/github.css";

    if (link.href !== location.origin + href) {
      link.href = href;
    }
  }, [theme]);

  return null;
};
