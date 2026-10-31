import type { SiteConfig } from "@/lib/types";
export const siteConfig: SiteConfig = {
  siteName: "Clip That Grass Wiki",
  shortName: "CG",
  siteSlug: "clip-that-grass",
  description: {
    en: "Clip That Grass codes, first-session walkthrough, tools and bags, upgrades, gems and Grandma’s phone guides."
  },
  siteUrl: "https://www.clipthatgrass.wiki",
  searchVisibility: "preview",
  architecture: {
    enabled: true,
    templates: [
      "landing",
      "hub"
    ]
  },
  theme: {
    accent: "#b8ed63",
    accentSoft: "#def8ad",
    background: "#0c1510",
    panel: "#15251a"
  },
  brandIcon: {
    src: "/images/official-icon.png",
    alt: {
      en: "Official Clip That Grass game icon"
    },
    sourceId: "official-game"
  },
  navigationIcons: {
    home: "guides",
    "getting-started": "guides",
    equipment: "tools",
    upgrades: "tools",
    phone: "maps",
    gems: "guides",
    codes: "codes",
    about: "guides"
  },
  supportedLocales: [
    "en",
    "de",
    "fr",
    "es",
    "ja"
  ],
  publishedLocales: [
    "en"
  ],
  plannedLocales: [],
  lastVerified: "2026-10-31",
  officialLinks: [
    {
      label: "Play on Roblox",
      url: "https://www.roblox.com/games/123004964392167/Clip-That-Grass"
    },
    {
      label: "FunkyInc. community",
      url: "https://www.roblox.com/communities/3794853/FunkyInc"
    }
  ],
  heroImage: {
    src: "/images/official-hero.png",
    alt: {
      en: "Official Clip That Grass promotional artwork showing a mower clearing a lawn"
    },
    sourceId: "official-game",
    heroMediaType: "official-promotional-image",
    ratio: "video"
  },
  heroVideo: null,
  mediaPresentation: {
    showImageText: false
  },
  analytics: {
    enabled: false
  },
  ads: {
    enabled: false,
    previewPlaceholders: false,
    desktopChrome: {
      enabled: false
    },
    placements: {
      "top-sticky": false,
      "left-sticky": false,
      "home-banner": false,
      "article-banner": false,
      "sidebar-square": false
    }
  },
  evidenceLabels: [
    {
      label: "Official and recorded gameplay",
      note: {
        en: "Recorded interfaces and prices can change."
      }
    }
  ],
  disclaimer: {
    en: "Independent fan guide. Not affiliated with Roblox or FunkyInc."
  }
} satisfies SiteConfig;
