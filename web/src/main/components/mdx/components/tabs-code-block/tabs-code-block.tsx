"use client";
import { TabsTrigger } from "@/shadcn/components/ui/tabs";
import { TabsList } from "@/shadcn/components/ui/tabs";
import React, { useState } from "react";
import { T_TAB_ITEM, T_TABS_CODE_BLOCK } from "./tabs-code-block.types";
import { Tabs } from "@/shadcn/components/ui/tabs";
import { SiTypescript } from "react-icons/si";
import { CopyButton } from "@/main/components/ui/copy-button";
import { TabsContent } from "@radix-ui/react-tabs";
import { useCopyableRef } from "./utils/use-copyable-ref";
import { extractValidTabItems } from "./utils/extract-valid-items";

export const TabItem = ({ children }: T_TAB_ITEM) => {
  return <>{children}</>;
};

export function TabsCodeBlock({ defaultValue, tsLogo = true, children }: T_TABS_CODE_BLOCK) {
  const [selectedTab, setSelectedTab] = useState(defaultValue);
  const { ref: tabContentRef, copyableValue } = useCopyableRef<HTMLDivElement>(selectedTab);

  const items = extractValidTabItems(children);

  return (
    <Tabs defaultValue={defaultValue} value={selectedTab} onValueChange={setSelectedTab} className="w-full bg-primary-foreground rounded-0 pb-3">
      <TabsList className="w-full border-b border-muted px-4 bg-transparent flex items-center justify-between">
        <div className="flex items-center justify-start gap-x-3">
          {tsLogo && <SiTypescript className="w-3.5 h-3.5 text-primary mt-0.5" />}
          <div className="flex items-center gap-x-5">
            {items.map((item) => (
              <TabsTrigger key={item.props.value} value={item.props.value} className="w-fit mt-2 pb-2 flex items-center gap-x-2">
                {item.props.label}
              </TabsTrigger>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-3">
          <CopyButton value={copyableValue} />
        </div>
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.props.value} value={item.props.value} ref={item.props.value === selectedTab ? tabContentRef : null} className="px-4 pt-2 pb-1 tabs-block">
          {item.props.children}
        </TabsContent>
      ))}
    </Tabs>
  );
}
