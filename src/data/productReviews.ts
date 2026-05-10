export interface ProductReview {
  name: string;
  text: string;
  rating: number;
}

const straightReviews: ProductReview[] = [
  { name: "Ama K.", text: "The texture and finish looked even better in person. It elevated my space immediately.", rating: 5 },
  { name: "Mimi A.", text: "Clean, modern, and soft. The piece added warmth without feeling busy.", rating: 5 },
];

const bodyWaveReviews: ProductReview[] = [
  { name: "Nana A.", text: "My custom piece felt thoughtful and beautifully made from start to finish.", rating: 5 },
  { name: "Ella D.", text: "The color direction was exactly what I asked for, and it fits my room perfectly.", rating: 5 },
];

const deepCurlReviews: ProductReview[] = [
  { name: "Akosua B.", text: "It was the perfect finishing detail for my shelf styling. Minimal but still very special.", rating: 5 },
  { name: "Efua M.", text: "The texture work is so intentional. It looks premium and calm in the space.", rating: 5 },
];

const naturalTextureReviews: ProductReview[] = [
  { name: "Joan S.", text: "The commissioned piece felt personal and polished. It looks like it belongs here.", rating: 5 },
  { name: "Dede A.", text: "Beautiful craftsmanship and very easy customization process.", rating: 5 },
];

export const getProductReviews = (productName: string) => {
  const key = productName.toLowerCase();

  if (key.includes("straight")) return straightReviews;
  if (key.includes("wave")) return bodyWaveReviews;
  if (key.includes("curl")) return deepCurlReviews;

  return naturalTextureReviews;
};
