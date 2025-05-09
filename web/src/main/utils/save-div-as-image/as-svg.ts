"use client";
import { inlineClasses } from "./utils/inline-classes";
import { inlineCss } from "./utils/inline-css";
import { inlineSpecifiedStyles } from "./utils/inline-styles";
import { inlineFont } from "./utils/inline-font";
import { downloadUrl } from "./utils/download-url";

export const saveDivAsSvg = async ({ divId, fileName }: { divId: string; fileName: string }) => {
  try {
    const node = document.getElementById(divId);
    const element = node ? (node.firstChild as HTMLElement) : node;

    if (!node || !element) {
      throw new Error(`Element #${divId} not found`);
    }

    const stylesheets = await Promise.all([inlineSpecifiedStyles(element), inlineCss(element), inlineClasses(element), inlineFont()]);

    stylesheets.forEach((el) => {
      if (el) {
        element.insertBefore(el, element.firstChild);
      }
    });

    const serialized_svg = new XMLSerializer().serializeToString(element.tagName === "svg" ? element : wrapSvg(element));

    const blob = new Blob([serialized_svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    downloadUrl(url, fileName + ".svg");
    URL.revokeObjectURL(url);
    return { success: true };
  } catch (error) {
    console.error(`Failed to save div as svg:`, error);
    return { success: false };
  }
};

export const wrapSvg = (node: HTMLElement): SVGSVGElement => {
  const width = node.offsetWidth;
  const height = node.offsetHeight;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height}`);

  const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
  foreignObject.setAttribute("width", `${width}`);
  foreignObject.setAttribute("height", `${height}`);

  const content = node.cloneNode(true) as HTMLElement;
  foreignObject.appendChild(content);

  svg.appendChild(foreignObject);

  return svg;
};
