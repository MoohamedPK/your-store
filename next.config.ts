import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns : [{protocol: "https", hostname: "**"}] // this for the image URL (get the images from any URL its protocol is https)
  }
};

export default nextConfig;
