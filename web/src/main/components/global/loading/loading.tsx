import Logo from "../logo/logo";

export function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Logo className="w-6 h-6 animate-spin" />
    </div>
  );
}
