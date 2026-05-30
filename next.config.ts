import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.0.148"],
  transpilePackages: ["@itme.day/rng-react-components"],
};

export default nextConfig;
