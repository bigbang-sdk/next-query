"use client";
import { saveDivAsPng } from "../utils/save-div-as-image";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";

export const SaveAsImage = ({ className, id, children }: { className?: string; id?: string; children: React.ReactNode }) => {
  const handleSave = () => {
    saveDivAsPng({ divId: id ?? "image", fileName: id ?? "image" });
  };

  return (
    <>
      <div className={cn(className)} id={id ?? "image"}>
        {children}
      </div>
      <Button onClick={handleSave}>Save as PNG</Button>
    </>
  );
};
