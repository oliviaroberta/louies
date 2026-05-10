import { useEffect, useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import PageBackButton from "@/components/PageBackButton";
import ProductImageBadges from "@/components/ProductImageBadges";
import { useAdminProducts } from "@/context/AdminProductsContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useSales } from "@/context/SalesContext";
import { buildProductInquiryMessage, WHATSAPP_NUMBER } from "@/lib/contact";
import { getProductImage } from "@/lib/productImages";
import { parseProductOptions } from "@/lib/productOptions";
import type { CatalogProduct } from "@/types/product";

const ProductDetails = () => {
  const { id = "" } = useParams();
  const { products } = useAdminProducts();
  const { formatPrice, currency } = useCurrency();
  const { getSalePrice } = useSales();

  const product = useMemo(() => products.find((item) => item.id === id) ?? null, [id, products]);
  const relatedProducts = useMemo(() => {
    if (!product) return [];

    const sameStyle = products.filter(
      (item) => item.id !== product.id && item.textureStyle === product.textureStyle,
    );
    const sameCategory = products.filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category &&
        item.textureStyle !== product.textureStyle,
    );
    const remaining = products.filter(
      (item) =>
        item.id !== product.id &&
        item.textureStyle !== product.textureStyle &&
        item.category !== product.category,
    );

    return [...sameStyle, ...sameCategory, ...remaining].slice(0, 3);
  }, [product, products]);

  const sizeOptions = useMemo(() => {
    if (!product) return [];
    const parsed = parseProductOptions(product.length);
    return parsed.length > 0 ? parsed : ["Standard"];
  }, [product]);

  const colorOptions = useMemo(() => {
    if (!product) return [];
    const parsed = parseProductOptions(product.color);
    return parsed.length > 0 ? parsed : ["Custom palette"];
  }, [product]);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    setSelectedSize(sizeOptions[0] ?? "");
    setSelectedColor(colorOptions[0] ?? "");
  }, [sizeOptions, colorOptions, id]);

  if (!product) {
    return (
      <PageShell>
        <div className="container mx-auto px-4 pb-20 pt-28 lg:px-8">
          <PageBackButton fallbackTo="/shop" />
          <div className="mt-8 rounded-2xl border border-border/60 bg-card/85 p-10 text-center backdrop-blur">
            <h1 className="font-display text-3xl font-semibold text-foreground">Product not found</h1>
            <p className="mt-3 font-body text-sm text-muted-foreground">
              The piece you are looking for does not exist.
            </p>
          </div>
        </div>
      </PageShell>
    );
  }

  const resolvedImage = getProductImage(product.name, product.image);
  const salePrice = getSalePrice(product.id, product.price);
  const effectivePrice = salePrice ?? product.price;
  const inquiryMessage = `${buildProductInquiryMessage(product.name)} Size: ${selectedSize || "Standard"}. Colorway: ${selectedColor || "Custom palette"}.`;

  return (
    <PageShell>
      <div className="container mx-auto px-4 pb-20 pt-28 lg:px-8">
        <PageBackButton fallbackTo="/shop" />

        <section className="mt-8 rounded-[2rem] border border-border/60 bg-card/85 p-5 backdrop-blur md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
            <div>
              <div className="relative overflow-hidden rounded-[1.5rem] bg-secondary/35">
                <img src={resolvedImage} alt={product.name} className="aspect-[4/5] w-full object-cover" />
                <ProductImageBadges isOnSale={!!salePrice} isBestseller={product.featured} />
              </div>
              {product.video ? (
                <div className="mt-4 overflow-hidden rounded-[1.5rem] border border-border/60 bg-background/60">
                  <video
                    src={product.video}
                    controls
                    playsInline
                    preload="metadata"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              ) : null}
            </div>

            <div>
              <p className="mb-3 font-body text-xs uppercase tracking-[0.28em] text-muted-foreground">
                {product.textureStyle}
              </p>
              <h1 className="mb-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
                {product.name}
              </h1>

              <div className="mb-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 font-body text-xs uppercase tracking-[0.18em] ${
                    product.status === "inStock"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground"
                  }`}
                >
                  {product.status === "inStock" ? "Available" : "Made to order"}
                </span>
                <span className="rounded-full border border-border px-3 py-1.5 font-body text-xs text-muted-foreground">
                  {product.category}
                </span>
                {salePrice ? (
                  <span className="rounded-full bg-accent px-3 py-1.5 font-body text-xs uppercase tracking-[0.18em] text-accent-foreground">
                    On Sale
                  </span>
                ) : null}
              </div>

              <div className="mb-6">
                {salePrice ? (
                  <p className="font-body text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Original Price
                  </p>
                ) : null}
                {salePrice ? (
                  <p className="font-body text-sm text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </p>
                ) : null}
                <p className="mt-1 font-body text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  Starting Price
                </p>
                <p className={`font-display text-3xl font-semibold ${salePrice ? "text-accent" : "text-foreground"}`}>
                  {formatPrice(effectivePrice)}
                </p>
                <p className="mt-2 font-body text-xs text-muted-foreground">
                  Final price can change if your customization requires a different size, finish, or complexity.
                </p>
                {currency !== "GHS" ? (
                  <p className="mt-2 font-body text-xs text-muted-foreground">
                    Displayed in {currency}. Admin base price stays in GHS.
                  </p>
                ) : null}
              </div>

              <OptionGroup label="Size" options={sizeOptions} selected={selectedSize} onSelect={setSelectedSize} />
              <OptionGroup label="Colorway" options={colorOptions} selected={selectedColor} onSelect={setSelectedColor} />

              <div className="mb-8 rounded-2xl border border-border/60 bg-background/60 p-5">
                <p className="mb-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Description
                </p>
                <p className="font-body text-sm leading-relaxed text-foreground/85">
                  {product.description}
                </p>
              </div>

              <div className="grid gap-4 rounded-[1.75rem] border border-accent/30 bg-accent/10 p-5">
                <div>
                  <p className="font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    Order Flow
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-foreground/85">
                    This piece is message-first. Send your preferred size and colorway on WhatsApp,
                    then we confirm availability and payment by Mobile Money or card.
                  </p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(inquiryMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-body text-sm uppercase tracking-[0.18em] text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_12px_24px_rgba(15,15,16,0.14)]"
                >
                  <MessageCircle size={16} />
                  Request This Piece
                </a>
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-12 rounded-[2rem] border border-border/60 bg-card/85 p-6 backdrop-blur md:p-8">
            <div className="mb-8 text-center">
              <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
                You May Also Like
              </p>
              <h2 className="font-display text-3xl font-light text-foreground md:text-4xl">
                More Pieces To <span className="font-semibold italic">Explore</span>
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {relatedProducts.map((item) => (
                <RelatedProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </PageShell>
  );
};

const RelatedProductCard = ({ product }: { product: CatalogProduct }) => {
  const { formatPrice, currency } = useCurrency();
  const { getSalePrice } = useSales();
  const salePrice = getSalePrice(product.id, product.price);
  const effectivePrice = salePrice ?? product.price;

  return (
    <Link
      to={`/shop/${product.id}`}
      className="group block rounded-[1.75rem] border border-border/60 bg-background/65 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20"
    >
      <div className="relative mb-4 overflow-hidden rounded-[1.4rem] bg-secondary/35">
        <img
          src={getProductImage(product.name, product.image)}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <ProductImageBadges isOnSale={!!salePrice} isBestseller={product.featured} />
      </div>

      <div className="rounded-[1.25rem] bg-card/55 p-4">
        <p className="mb-1 font-body text-[11px] uppercase tracking-[0.24em] text-muted-foreground">
          {product.textureStyle}
        </p>
        <h3 className="font-display text-xl font-semibold text-foreground">{product.name}</h3>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div>
            {salePrice ? (
              <p className="font-body text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Original Price
              </p>
            ) : null}
            {salePrice ? (
              <p className="font-body text-xs text-muted-foreground line-through">
                {formatPrice(product.price)}
              </p>
            ) : null}
            <p className="mt-1 font-body text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Starting Price
            </p>
            <p className={`font-display text-xl font-semibold ${salePrice ? "text-accent" : "text-foreground"}`}>
              {formatPrice(effectivePrice)}
            </p>
            {currency !== "GHS" ? (
              <p className="mt-1 font-body text-[11px] text-muted-foreground">
                Displayed in {currency}
              </p>
            ) : null}
          </div>
          <div className="inline-flex items-center gap-1 font-body text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
};

const PageShell = ({ children }: { children: React.ReactNode }) => (
  <div className="mono-page relative min-h-screen">
    <div className="relative z-10">
      <Navbar />
      <CartDrawer />
      {children}
      <Footer />
    </div>
  </div>
);

const OptionGroup = ({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) => (
  <div className="mb-6">
    <p className="mb-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
      {label}
    </p>
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded border px-3 py-1.5 font-body text-xs transition-colors ${
            selected === option
              ? "border-foreground bg-foreground text-background"
              : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default ProductDetails;
