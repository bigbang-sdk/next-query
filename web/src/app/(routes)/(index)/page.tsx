import "@/main/css/index.css";
import HomeHero from "./_components/hero/hero";
import { HomeMain } from "./_components/main/main";

export default async function Home() {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="container-wrapper max-auto w-full flex flex-1 flex-col gap-0 mt-0 border-0 border-0 overflow-hidden border-x">
        <HomeHero />
        <HomeMain />
      </div>
    </div>
  );
}
