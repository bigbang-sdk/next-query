import Logo from "../theme/logo";

export async function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Logo className="w-6 h-6 animate-spin" />
    </div>
  );
}
