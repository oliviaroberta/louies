import type { GalleryItem } from "@/types/gallery";

export const previewGalleryItems: GalleryItem[] = [
  {
    id: "gallery-1",
    mediaType: "IMAGE",
    mediaUrl: "/hero-yarn-reference.jpeg",
    customerName: "LOUIES Studio",
    caption: "Neutral yarn textures and styling inspiration for the LOUIES collection.",
    isPublished: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gallery-2",
    mediaType: "IMAGE",
    mediaUrl: "/placeholder-yarn-art.svg",
    customerName: "Custom Order",
    caption: "A preview of a personalized wall piece developed around a client brief.",
    isPublished: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "gallery-3",
    mediaType: "IMAGE",
    mediaUrl: "/hero-yarn-reference.jpeg",
    customerName: "Interior Styling",
    caption: "Soft black, white, and gold direction for modern home decor styling.",
    isPublished: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
