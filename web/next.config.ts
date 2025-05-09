import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    dynamicIO: true,
    reactCompiler: true,
  },
  transpilePackages: ["next-mdx-remote"],
};

export default nextConfig;
