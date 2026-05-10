import { API_BASE_URL } from "@/lib/api";

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const getProductImage = (name: string, image?: string) => {
  const trimmed = image?.trim();

  if (trimmed) {
    if (
      trimmed.startsWith("blob:") ||
      trimmed.startsWith("data:")
    ) {
      return trimmed;
    }

    if (
      trimmed.startsWith("http://localhost:4000/uploads/") ||
      trimmed.startsWith("https://localhost:4000/uploads/")
    ) {
      return trimmed.replace(/^https?:\/\/localhost:4000/, BACKEND_BASE_URL);
    }

    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }

    if (trimmed.startsWith("/uploads/")) {
      return `${BACKEND_BASE_URL}${trimmed}`;
    }

    if (!trimmed.startsWith("/images/")) {
      return trimmed;
    }
  }

  return "/placeholder-yarn-art.svg";
};
