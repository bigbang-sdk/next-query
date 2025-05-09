import { toPng } from "html-to-image";

export async function saveDivAsPng({ divId, fileName }: { divId: string; fileName: string }) {
  const node = document.getElementById(divId);

  if (!node) {
    console.error(`Element #${divId} not found`);
    return;
  }

  try {
    inlineComputedStyles(node); // Resolve all CSS vars before rendering

    const dataUrl = await toPng(node);
    const link = document.createElement("a");
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error(`Failed to export as png:`, err);
  }
}

function inlineComputedStyles(node: HTMLElement) {
  const computedStyle = getComputedStyle(node);

  for (const key of computedStyle) {
    node.style.setProperty(key, computedStyle.getPropertyValue(key));
  }

  for (const child of node.children) {
    inlineComputedStyles(child as HTMLElement);
  }
}

export const saveDivAsSvg = ({ divId, fileName }: { divId: string; fileName: string }) => {
  const node = document.getElementById(divId);

  if (!node) {
    console.error(`Element #${divId} not found`);
    return;
  }

  inlineComputedStyles(node);

  // Wrap in full SVG structure if needed
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${node.offsetWidth}" height="${node.offsetHeight}">
      <foreignObject width="100%" height="100%">
        ${new XMLSerializer().serializeToString(node)}
      </foreignObject>
    </svg>
  `;

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.download = `${fileName}.svg`;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url); // Clean up
};
