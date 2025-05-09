"use client";
import { toPng } from "html-to-image";
import { inlineComputedStyles } from "./utils/inline-styles";
import { downloadUrl } from "./utils/download-url";

export const saveDivAsPng = async ({ divId, fileName }: { divId: string; fileName: string }) => {
  try {
    const node = document.getElementById(divId);

    if (!node) {
      throw new Error(`Element #${divId} not found`);
    }

    inlineComputedStyles(node);

    const dataUrl = await toPng(node);
    downloadUrl(dataUrl, fileName + ".png");
    return { success: true };
  } catch (err) {
    console.error(`Failed to save div as png:`, err);
    return { success: false };
  }
};
