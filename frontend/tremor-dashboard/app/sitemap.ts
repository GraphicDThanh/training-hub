import { MetadataRoute } from "next";
import { ROUTER_DOMAIN, ROUTES } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${ROUTER_DOMAIN}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.SIGN_UP}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.SIGN_IN}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.ANALYTICS}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.PROJECTS}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.PROFILE}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.SALES}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.SETTING}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${ROUTER_DOMAIN}${ROUTES.BILLING}`,
      lastModified: "2024-04-22T09:57:32.375Z",
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];
}
