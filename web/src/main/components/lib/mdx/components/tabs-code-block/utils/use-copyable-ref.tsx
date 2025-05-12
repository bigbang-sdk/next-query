"use client";
import { useEffect, useRef, useState } from "react";

export function useCopyableRef<T extends HTMLElement>(selectedTab: string) {
  const ref = useRef<T | null>(null);
  const [copyableValue, setCopyableValue] = useState("");

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        setCopyableValue(ref.current.innerText.trim());
      }
    };

    const frame = requestAnimationFrame(() => {
      const timeout = setTimeout(update, 0);
      return () => clearTimeout(timeout);
    });

    return () => cancelAnimationFrame(frame);
  }, [selectedTab]);

  return { ref, copyableValue };
}
