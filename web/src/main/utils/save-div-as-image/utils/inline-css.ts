"use client";

import { SVG_NAMESPACE } from "./defaults";

export const inlineCss = (node: HTMLElement): SVGStyleElement | null => {
  const varRegex = /var\(\s*(--[\w-]+)\s*\)/g;
  const seen = new Set<string>();

  function collect(nodeEl: Element) {
    for (const attr of Array.from(nodeEl.attributes)) {
      for (const m of attr.value.matchAll(varRegex)) {
        seen.add(m[1]);
      }
    }
    for (const child of Array.from(nodeEl.children)) {
      collect(child);
    }
  }
  collect(node);

  const defs: Record<string, string> = {};
  for (const name of seen) {
    const val = getComputedStyle(node).getPropertyValue(name).trim();
    if (val) {
      defs[name] = val;
    }
  }

  if (Object.keys(defs).length) {
    const styleEl = document.createElementNS(SVG_NAMESPACE, "style");
    styleEl.textContent = `:root { ${Object.entries(defs)
      .map(([k, v]) => `${k}: ${v};`)
      .join(" ")} }`;

    return styleEl;
  }

  return null;
};
