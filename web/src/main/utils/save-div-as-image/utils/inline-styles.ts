"use client";
export const inlineSpecifiedStyles = (node: HTMLElement) => {
  const inlineStyle = node.style;

  for (const name of Object.keys(inlineStyle)) {
    const value = inlineStyle.getPropertyValue(name);
    if (value) {
      node.style.setProperty(name, value, inlineStyle.getPropertyPriority(name));
    }
  }

  for (const child of node.children) {
    inlineSpecifiedStyles(child as HTMLElement);
  }
};

export function inlineComputedStyles(node: HTMLElement) {
  const computedStyle = getComputedStyle(node);

  for (const key of computedStyle) {
    node.style.setProperty(key, computedStyle.getPropertyValue(key));
  }

  for (const child of node.children) {
    inlineComputedStyles(child as HTMLElement);
  }
}
