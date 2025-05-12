"use client";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/shadcn/lib/utils";
import { saveDivAsPng } from "../utils/save-div-as-image/as-png";
import { saveDivAsSvg } from "../utils/save-div-as-image/as-svg";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Loading } from "../components/global/loading/loading";
import { useSafeTheme } from "./theme-provider";

type Format = "PNG" | "SVG";
const FORMATS: Format[] = ["PNG", "SVG"];
const MESSAGES = {
  loading: "Saving...",
  success: "Image saved",
  error: "Failed to save image",
};

export const SaveAsImage: React.FC<{
  className?: string;
  id?: string;
  appendTheme?: boolean;
  children: React.ReactNode;
}> = ({ className, id = "image", appendTheme = false, children }) => {
  const { hydrated, theme } = useSafeTheme();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const timerRef = useRef<number | null>(null);
  const finalId = appendTheme ? `${id}-${theme}` : id;

  // clear any pending timeout on unmount
  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  // after success/error, reset to idle
  const reset = useCallback(() => {
    timerRef.current = window.setTimeout(() => setStatus("idle"), 1500);
  }, []);

  const handleSave = useCallback(
    async (format: Format) => {
      setStatus("loading");
      try {
        const { success } = format === "PNG" ? await saveDivAsPng({ divId: finalId, fileName: finalId }) : await saveDivAsSvg({ divId: finalId, fileName: finalId });
        setStatus(success ? "success" : "error");
      } catch {
        setStatus("error");
      }
      reset();
    },
    [reset, finalId]
  );

  if (appendTheme && !hydrated) return <Loading />;

  return (
    <>
      <div
        className={cn(className)}
        id={finalId}
      >
        {children}
      </div>
      <div className="flex items-center justify-end gap-2 mt-1 text-xs font-semibold text-subtext">
        {status === "loading" && (
          <>
            <Loader2 className="w-3 h-3 animate-spin" />
            <span>{MESSAGES.loading}</span>
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="w-3 h-3" />
            <span>{MESSAGES.error}</span>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-3 h-3" />
            <span>{MESSAGES.success}</span>
          </>
        )}
        {status === "idle" && (
          <>
            <span>Save as:</span>
            {FORMATS.map((format, i) => (
              <React.Fragment key={format}>
                {i > 0 && <span>|</span>}
                <button
                  className="ml-1 cursor-pointer hover:text-foreground"
                  onClick={() => handleSave(format)}
                >
                  {format}
                </button>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </>
  );
};
