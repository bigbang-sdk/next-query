"use client";

import * as React from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useSafeTheme } from "@/main/wrappers/theme-provider";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shadcn/components/ui/dropdown-menu";
import { cn } from "@/shadcn/lib/utils";

const themeIcons = {
  light: <Sun className="w-4.5 h-4.5 md:w-4 md:h-4" />,
  dark: <Moon className="w-4.5 h-4.5 md:w-4 md:h-4" />,
  system: <Monitor className="w-4.5 h-4.5 md:w-4 md:h-4" />,
};

const themeOptions = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] as const;

export function ThemeToggle({ withBox = true }: { withBox?: boolean }) {
  const { mounted, theme, setTheme } = useSafeTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={cn(
            "cursor-pointer flex items-center justify-center rounded-md outline-none border-none text-muted-foreground hover:text-foreground w-8.5 h-8.5",
            withBox && "bg-primary-foreground"
          )}
        >
          {mounted ? themeIcons[theme as keyof typeof themeIcons] ?? themeIcons.system : themeIcons.system}
          <span className="sr-only">Toggle theme</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="border-none">
        {themeOptions.map(({ value, label, Icon }) => (
          <DropdownMenuItem key={value} onClick={() => setTheme(value)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Icon className="h-[1.2rem] w-[1.2rem]" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
