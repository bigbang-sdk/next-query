import { toPng } from "html-to-image";

export async function saveDivAsPng({ divId, fileName }: { divId: string; fileName: string }) {
  const node = document.getElementById(divId);

  if (!node) {
    console.error(`Element #${divId} not found`);
    return;
  }

  try {
    const dataUrl = await toPng(node);
    const extension = "png";

    const link = document.createElement("a");
    link.download = `${fileName}.${extension}`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error(`Failed to export as png:`, err);
  }
}
