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
