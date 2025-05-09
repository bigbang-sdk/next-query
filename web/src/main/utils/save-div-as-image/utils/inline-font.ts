"use client";
const getFontCssSelector = (family: string) => {
  return `
    svg, svg * {
      font-family: '${family}', sans-serif !important;
    }
    `;
};

export const inlineFont = async (): Promise<SVGDefsElement | null> => {
  const family = "Geist";
  const weights = [400, 700];
  const gfUrl = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weights.join(";")}&display=swap`;
  const css = await fetch(gfUrl).then((r) => r.text());

  const svgNS = "http://www.w3.org/2000/svg";
  const defs = document.createElementNS(svgNS, "defs");
  const styleEl = document.createElementNS(svgNS, "style");
  styleEl.setAttribute("type", "text/css");

  styleEl.textContent = css + getFontCssSelector(family);

  defs.appendChild(styleEl);

  return defs;
};
