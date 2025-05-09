"use client";
import { saveDivAsPng, saveDivAsSvg } from "../utils/save-div-as-image";
import { Button } from "@/shadcn/components/ui/button";
import { cn } from "@/shadcn/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { useState } from "react";

const VALUE_OPTIONS = ["PNG", "SVG"];

export const SaveAsImage = ({ className, id, children }: { className?: string; id?: string; children: React.ReactNode }) => {
  const [selectedValue, setSelectedValue] = useState<(typeof VALUE_OPTIONS)[number]>(VALUE_OPTIONS[0]);

  const handleSave = () => {
    if (selectedValue === "PNG") {
      saveDivAsPng({ divId: id ?? "image", fileName: id ?? "image" });
    } else {
      saveDivAsSvg({ divId: id ?? "image", fileName: id ?? "image" });
    }
  };

  return (
    <>
      <div className={cn(className)} id={id ?? "image"}>
        {children}
      </div>
      <div className="flex items-center justify-end gap-2 mt-2">
        <SelectType setSelectedValue={setSelectedValue} />
        <Button size={"sm"} onClick={handleSave}>
          Save as {selectedValue}
        </Button>
      </div>
    </>
  );
};

export function SelectType({ setSelectedValue }: { setSelectedValue: (value: (typeof VALUE_OPTIONS)[number]) => void }) {
  return (
    <Select onValueChange={setSelectedValue} defaultValue={VALUE_OPTIONS[0]}>
      <SelectTrigger size="sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {VALUE_OPTIONS.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
