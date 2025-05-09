import Link from "next/link";
import Logo from "../theme/logo";
import Search from "./components/search";
import { ThemeToggle } from "../theme/theme-toggle";
import { HeaderLinks } from "./components/links";

export const Header = () => {
  return (
    <div className="w-full h-14 border-b sticky top-0 bg-background z-10 flex flex-col justify-center">
      <div className="container-wrapper flex items-center justify-between border-x px-5 h-full">
        <Link href={"/"} className="wiggle">
          <Logo className="w-6 h-6" />
        </Link>
        <div className="flex items-center justify-end gap-5 md:gap-8">
          <HeaderLinks />
          <div className="flex items-center gap-4">
            <Search />
            <ThemeToggle withBox={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
