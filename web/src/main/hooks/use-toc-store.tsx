import { atom, useAtom } from "jotai";

const data = atom<string | null>(null);

export const useTocStore = () => {
  const [activeHash, setActiveHash] = useAtom(data);

  return { activeHash, setActiveHash };
};
