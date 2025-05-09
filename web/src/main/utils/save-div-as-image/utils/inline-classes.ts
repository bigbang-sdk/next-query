"use client";

import { SVG_NAMESPACE } from "./defaults";

export const inlineClasses = (node: HTMLElement): SVGStyleElement | null => {
  const seen = new Set<string>();
  node.querySelectorAll<HTMLElement | SVGSVGElement>("[class]").forEach((el) => el.classList.forEach((c) => seen.add(c)));

  const classDecls: Record<string, string> = {};
  function walkRules(rules: CSSRuleList) {
    for (const rule of Array.from(rules)) {
      if (rule instanceof CSSStyleRule) {
        const sels = rule.selectorText.split(",").map((s) => s.trim());
        for (const cls of seen) {
          const raw = `.${cls}`;
          if (sels.some((s) => s === raw || s.startsWith(raw + ":") || s.includes(` ${raw}`))) {
            classDecls[cls] = (classDecls[cls] || "") + rule.style.cssText + ";";
          }
        }
      } else if ((rule as CSSGroupingRule).cssRules) {
        walkRules((rule as CSSGroupingRule).cssRules);
      }
    }
  }

  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walkRules(sheet.cssRules!);
    } catch (e: unknown) {
      console.warn("Could not access rules for stylesheet", sheet.href, e);
    }
  }

  // 4) inject a <style> with only your used classes
  if (Object.keys(classDecls).length) {
    const styleEl = document.createElementNS(SVG_NAMESPACE, "style");
    styleEl.textContent = Object.entries(classDecls)
      .map(([cls, decls]) => `.${cls}{${decls}}`)
      .join("\n");

    return styleEl;
  }

  return null;
};
