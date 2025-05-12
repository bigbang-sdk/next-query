"use client";
import { BookOpenText, SearchIcon } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shadcn/components/ui/command";
import { Dialog, DialogContent, DialogTitle } from "@/shadcn/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { docList } from "@/main/docs/docs-list";
import Link from "next/link";
import { useState } from "react";

const Search = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer flex items-center justify-center md:justify-start gap-2 text-subtext hover:text-foreground bg-none md:bg-primary-foreground rounded-md px-0 py-0 md:px-4 md:py-1.5 w-10 md:w-40"
        onClick={() => setSearchOpen(true)}
      >
        <SearchIcon className="w-[1.2rem] h-[1.2rem] md:w-3.5 md:h-3.5" />
        <span className="text-sm hidden md:block">Search</span>
      </div>
      <SearchBox
        open={searchOpen}
        setOpen={setSearchOpen}
      />
    </>
  );
};

export default Search;

const SearchBox = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <VisuallyHidden asChild>
        <DialogTitle>Search</DialogTitle>
      </VisuallyHidden>
      <DialogContent
        className="sm:max-w-[425px] p-0"
        closeButton={false}
      >
        <Command className="rounded-lg border shadow-md bg-background border-none">
          <CommandInput
            wrapperClassName="h-12"
            placeholder="Type a command or search..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {docList.map((category, index) => (
              <CommandGroup
                key={index}
                heading={category.categoryTitle}
              >
                {category.docs.map((doc, index2) => (
                  <Link
                    key={index2}
                    href={`/docs/${category.categorySlug}/${doc.docSlug}`}
                  >
                    <CommandItem className="cursor-pointer text-subtext hover:text-text">
                      <BookOpenText className="w-4 h-4" />
                      <span>{doc.docTitle}</span>
                    </CommandItem>
                  </Link>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
};
