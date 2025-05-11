"use client";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

export const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div
      className="w-6 w-6 text-subtext hover:text-text cursor-pointer"
      onClick={() => handleCopy(value)}
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 " />}
    </div>
  );
};
