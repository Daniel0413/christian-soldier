import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Christian Soldier",
    short_name: "Christian Soldier",
    description: "Fight the good fight of faith.",
    start_url: "/",
    display: "standalone",
    background_color: "#111827",
    theme_color: "#0B1220",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}