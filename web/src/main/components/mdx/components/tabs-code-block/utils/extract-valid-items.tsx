"use client";
import React from "react";
import { T_TAB_ITEM } from "../tabs-code-block.types";

export function extractValidTabItems(children: React.ReactNode): React.ReactElement<T_TAB_ITEM>[] {
  return React.Children.toArray(children).filter((c): c is React.ReactElement<T_TAB_ITEM> => {
    if (!React.isValidElement(c)) return false;
    const props = c.props as { value?: unknown; label?: unknown };
    return typeof props.value === "string" && typeof props.label === "string";
  });
}
