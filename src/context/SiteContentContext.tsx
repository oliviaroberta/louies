import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "@/lib/api";
import { PREVIEW_MODE } from "@/lib/preview";
import { useAuth } from "./AuthContext";

export interface HeroContent {
  eyebrow: string;
  titleLine1: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
}

export interface HowItWorksStepContent {
  num: string;
  title: string;
  text: string;
}

export interface AboutFeatureContent {
  title: string;
  text: string;
}

export interface SiteContent {
  hero: HeroContent;
  howItWorks: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    steps: HowItWorksStepContent[];
  };
  about: {
    eyebrow: string;
    title: string;
    titleHighlight: string;
    description: string;
    features: AboutFeatureContent[];
  };
}

interface SiteContentContextType {
  content: SiteContent;
  isLoading: boolean;
  updateContent: (content: SiteContent) => Promise<void>;
  updateHero: (hero: HeroContent) => Promise<void>;
  updateHowItWorks: (howItWorks: SiteContent["howItWorks"]) => Promise<void>;
  updateAbout: (about: SiteContent["about"]) => Promise<void>;
  refreshContent: () => Promise<void>;
}

const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Custom Yarn Art",
    titleLine1: "Statement Pieces",
    titleHighlight: "Made Personal",
    description:
      "Bold black, white, and gold yarn art for modern rooms, gifting, and custom moments.",
    ctaLabel: "Shop Collection",
  },
  howItWorks: {
    eyebrow: "How To Order",
    title: "How LOUIES",
    titleHighlight: "Works",
    steps: [
      {
        num: "01",
        title: "Browse Pieces",
        text: "Explore the collection and shortlist the yarn art styles that fit your space, mood, or gift idea.",
      },
      {
        num: "02",
        title: "Message Your Brief",
        text: "Send us your favorite piece, preferred size, colors, and any custom note on WhatsApp.",
      },
      {
        num: "03",
        title: "Confirm & Pay",
        text: "We confirm the final details, then you pay by Mobile Money or card before production or delivery.",
      },
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "The",
    titleHighlight: "LOUIES Difference",
    description:
      "LOUIES is a yarn art brand built around statement-making decor with a clean, fashion-aware edge. Every piece is designed to feel personal, elevated, and expressive.",
    features: [
      {
        title: "Design-Led",
        text: "Every piece is shaped with a strong visual direction instead of generic craft styling.",
      },
      {
        title: "Custom-Friendly",
        text: "You can adjust colors, names, sizes, and details to suit your exact brief.",
      },
      {
        title: "Gift Worthy",
        text: "Made for memorable gifting, room upgrades, launches, and personal keepsakes.",
      },
    ],
  },
};

const hasLegacyBranding = (value: unknown) =>
  typeof value === "string" && /(dees|ponytail|ponytails|hair|glam)/i.test(value);

const sectionHasLegacyBranding = (section: unknown) => {
  if (!section || typeof section !== "object") {
    return false;
  }

  return Object.values(section).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => sectionHasLegacyBranding(item));
    }

    if (value && typeof value === "object") {
      return sectionHasLegacyBranding(value);
    }

    return hasLegacyBranding(value);
  });
};

const sanitizeSiteContent = (content: SiteContent): SiteContent => ({
  hero: sectionHasLegacyBranding(content.hero) ? defaultContent.hero : content.hero,
  howItWorks: sectionHasLegacyBranding(content.howItWorks)
    ? defaultContent.howItWorks
    : content.howItWorks,
  about: sectionHasLegacyBranding(content.about) ? defaultContent.about : content.about,
});

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined);
let siteContentCache: SiteContent | null = null;
let siteContentRequest: Promise<SiteContent> | null = null;

const fetchSiteContent = async () => {
  if (PREVIEW_MODE) {
    return defaultContent;
  }

  if (siteContentCache) {
    return siteContentCache;
  }

  if (!siteContentRequest) {
    siteContentRequest = apiRequest<{ item: { content: SiteContent } }>("/site-content")
      .then((response) => {
        const sanitized = sanitizeSiteContent(response.item.content);
        siteContentCache = sanitized;
        return sanitized;
      })
      .finally(() => {
        siteContentRequest = null;
      });
  }

  return siteContentRequest;
};

export const SiteContentProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = useAuth();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  const refreshContent = async () => {
    setIsLoading(true);
    try {
      siteContentCache = null;
      const nextContent = await fetchSiteContent();
      setContent(nextContent);
    } catch {
      setContent(defaultContent);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      try {
        const nextContent = await fetchSiteContent();
        if (isMounted) {
          setContent(nextContent);
        }
      } catch {
        if (isMounted) {
          setContent(defaultContent);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveContent = async (nextContent: SiteContent) => {
    if (!accessToken) {
      throw new Error("Admin authentication is required");
    }

    const response = await apiRequest<{ item: { content: SiteContent } }>("/site-content", {
      method: "PUT",
      token: accessToken,
      body: JSON.stringify(nextContent),
    });

    const sanitized = sanitizeSiteContent(response.item.content);
    siteContentCache = sanitized;
    setContent(sanitized);
  };

  const value = useMemo<SiteContentContextType>(
    () => ({
      content,
      isLoading,
      updateContent: saveContent,
      updateHero: async (hero) => {
        await saveContent({ ...content, hero });
      },
      updateHowItWorks: async (howItWorks) => {
        await saveContent({ ...content, howItWorks });
      },
      updateAbout: async (about) => {
        await saveContent({ ...content, about });
      },
      refreshContent,
    }),
    [accessToken, content, isLoading],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContent = () => {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }

  return context;
};
