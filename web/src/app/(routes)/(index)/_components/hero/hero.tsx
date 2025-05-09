import { cn } from "@/shadcn/lib/utils";

export default async function HomeHero() {
  const tags = ["Fast", "Lightweight", "Reusable", "SWR", "Caching", "Revalidation", "Real-time", "Pagination"];

  return (
    <div className="flex flex-1 flex-col items-center border-b">
      <div className="flex flex-1 flex-col items-center justify-center overflow-hidden square-grid-bg bg-background">
        <div className="w-full flex items-center justify-center min-h-[600px] md:min-h-[500px]">
          <div className="flex flex-col items-center justify-center">
            <TagList tags={tags.slice(0, 4)} offset={0} />
            <HeroText />
            <TagList tags={tags.slice(4)} offset={4} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroText() {
  const titleClass = "text-[4rem] lg:text-[6rem] font-bold px-2";
  const renderWord = (word: string) =>
    word.split("").map((char, index) => (
      <p key={index} className={titleClass}>
        {char}
      </p>
    ));

  return (
    <div className="block md:flex items-center justify-center gap-x-4">
      <div className="flex justify-center">{renderWord("NEXT")}</div>
      <div className="flex justify-center">{renderWord("QUERY")}</div>
    </div>
  );
}

function TagList({ tags, offset }: { tags: string[]; offset: number }) {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-8 lg:gap-x-14", offset === 0 ? "mb-5" : "mt-5")}>
      {tags.map((tag, i) => (
        <Tag key={tag} tag={tag} index={i + offset} />
      ))}
    </div>
  );
}

const TAG_STYLES = [
  { rotate: "-rotate-12", shift: "-translate-y-5" },
  { rotate: "rotate-9", shift: "-translate-y-9" },
  { rotate: "rotate-3", shift: "-translate-y-12" },
  { rotate: "-rotate-3", shift: "-translate-y-5" },
  { rotate: "-rotate-6", shift: "translate-y-5" },
  { rotate: "rotate-8", shift: "translate-y-7" },
  { rotate: "rotate-6", shift: "translate-y-7" },
  { rotate: "rotate-12", shift: "translate-y-10" },
];

function Tag({ tag, index }: { tag: string; index: number }) {
  const style = TAG_STYLES[index] ?? { rotate: "", shift: "" };

  return (
    <div className={cn("flex items-center justify-center px-6 py-1 rounded-md border-2", `bg-tag-${index}`, style.rotate, style.shift)}>
      <p className="text-md lg:text-xl font-semibold">{tag}</p>
    </div>
  );
}
