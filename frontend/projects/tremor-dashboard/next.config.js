/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([], {
  ...(process.env.NODE_ENV === "production" && {
    compiler: { removeConsole: true },
  }),
  experimental: {
    optimizePackageImports: [
      "@/components",
      "@/constants",
      "@/helpers",
      "@/themes",
      "@/context",
      "@/hocs",
      "@/hooks",
      "@/types",
      "@/features",
      "@/config",
      "react-quill",
      "react-fast-compare",
      "@tremor/react",
      "react-icons/fs",
      "react-icons/md",
      "react-icons/rx",
      "react-icons/tb",
      "react-icons/io5",
      "react-icons/bs",
      "react-icons/fa",
      "react-icons/fa6",
      "react-icons/gr",
      "react-icons/hi2",
      "react-icons/pi",
      "react-icons/ti",
      "react-icons/ri",
      "react-icons/io",
      "react-hook-form",
      "react-intersection-observer",
      "firebase/firestore",
      "firebase/app",
      "dayjs",
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [440, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "demos.creative-tim.com",
        port: "",
      },
      { protocol: "https", hostname: "i.ibb.co", port: "" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, must-revalidate",
          },
        ],
      },
    ];
  },
});
