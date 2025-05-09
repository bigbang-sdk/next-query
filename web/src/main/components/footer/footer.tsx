import { TbHeartFilled } from "react-icons/tb";

export const Footer = () => {
  return (
    <div className="w-full h-14 border-t bg-background z-10">
      <div className="container-wrapper flex items-center justify-between border-x px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">Made with</p>
          <TbHeartFilled className="w-4 h-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">by Bigbang</p>
        </div>
      </div>
    </div>
  );
};
