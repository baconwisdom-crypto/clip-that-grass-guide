import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  turbopack: { root: process.env.GAME_GUIDE_LOCAL_DEPENDENCY_ROOT ?? process.cwd() },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
