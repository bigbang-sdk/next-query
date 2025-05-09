import "server-only";
import { headers } from "next/headers";

export const isMobileRequest = async () => {
  const userAgent = (await headers()).get("user-agent") || "";
  const isMobileRequest = /Mobi|Android|iPhone/i.test(userAgent);
  return isMobileRequest;
};
