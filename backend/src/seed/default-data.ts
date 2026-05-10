export const defaultSiteContent = {
  hero: {
    eyebrow: "Custom Yarn Art",
    titleLine1: "Handcrafted Texture",
    titleHighlight: "For Modern Spaces",
    description:
      "Minimal yarn art pieces made for gifting, styling shelves, and creating calm, personalized corners in your home.",
    ctaLabel: "Shop Collection",
  },
  howItWorks: {
    eyebrow: "Simple Process",
    title: "How It",
    titleHighlight: "Works",
    steps: [
      {
        num: "01",
        title: "Browse",
        text: "Explore available yarn art pieces, signature styles, and sample textures.",
      },
      {
        num: "02",
        title: "Customize",
        text: "Message LOUIES with your color palette, size, and any personalization you want.",
      },
      {
        num: "03",
        title: "Confirm",
        text: "We confirm final details, timeline, and payment before production begins.",
      },
    ],
  },
  about: {
    eyebrow: "About Us",
    title: "The",
    titleHighlight: "LOUIES Approach",
    description:
      "LOUIES creates yarn art that feels soft, graphic, and personal. Each piece is designed with intention so it can live beautifully in homes, workspaces, and gift moments.",
    features: [
      {
        title: "Thoughtful Craft",
        text: "Every piece is made with careful texture, shape, and finishing details.",
      },
      {
        title: "Custom Friendly",
        text: "Colors, proportions, and styling direction can be adjusted to suit the client.",
      },
      {
        title: "Designed to Gift",
        text: "Made for meaningful gifting, quiet luxury, and modern decor styling.",
      },
    ],
  },
};

export const defaultProducts = [
  {
    slug: "woven-wall-piece",
    name: "Woven Wall Piece",
    image: "/placeholder-yarn-art.svg",
    category: "Wall Art",
    textureStyle: "Layered Weave",
    length: "Small, Medium, Large",
    color: "Black, Ivory, Gold",
    stock: 12,
    price: 180,
    description: "A modern woven statement piece designed to add warmth and structure to a clean interior.",
    featured: true,
    status: "IN_STOCK",
  },
  {
    slug: "custom-name-piece",
    name: "Custom Name Piece",
    image: "/placeholder-yarn-art.svg",
    category: "Personalized Art",
    textureStyle: "Script Form",
    length: "Standard, Oversized",
    color: "Ivory, Sand, Gold",
    stock: 9,
    price: 220,
    description: "A personalized yarn design made for names, initials, and custom gifting moments.",
    featured: true,
    status: "IN_STOCK",
  },
  {
    slug: "textured-shelf-accent",
    name: "Textured Shelf Accent",
    image: "/placeholder-yarn-art.svg",
    category: "Decor Accent",
    textureStyle: "Soft Coil",
    length: "Petite, Standard",
    color: "Black, Oat, Soft Gold",
    stock: 7,
    price: 240,
    description: "A compact sculptural piece created to style shelves, desks, and intimate corners.",
    featured: true,
    status: "IN_STOCK",
  },
  {
    slug: "commissioned-installation",
    name: "Commissioned Installation",
    image: "/placeholder-yarn-art.svg",
    category: "Commission",
    textureStyle: "Mixed Texture",
    length: "Made to Measure",
    color: "Client Palette",
    stock: 6,
    price: 210,
    description: "A made-to-order installation developed around the client’s space, palette, and preferences.",
    featured: false,
    status: "IN_STOCK",
  },
] as const;

export const defaultProductReviews = [
  {
    productSlug: "woven-wall-piece",
    customerName: "Ama K.",
    rating: 5,
    text: "The texture and finish looked even better in person. It elevated my space immediately.",
    status: "APPROVED" as const,
  },
  {
    productSlug: "custom-name-piece",
    customerName: "Nana A.",
    rating: 5,
    text: "My custom piece felt thoughtful, clean, and beautifully made from start to finish.",
    status: "APPROVED" as const,
  },
  {
    productSlug: "textured-shelf-accent",
    customerName: "Akosua B.",
    rating: 5,
    text: "It was the perfect finishing detail for my shelf styling. Minimal but still very special.",
    status: "APPROVED" as const,
  },
];
