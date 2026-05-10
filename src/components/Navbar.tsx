import { useEffect, useState } from "react";
import { MessageCircle, Menu, Search, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSales } from "@/context/SalesContext";
import { ORDER_WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/lib/contact";
import BrandWordmark from "./BrandWordmark";
import SearchDialog from "./SearchDialog";

const Navbar = () => {
  const { isLive } = useSales();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Gallery", href: "/gallery" },
    ...(isLive ? [{ label: "Sales", href: "/sales" }] : []),
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastY) {
        setHidden(true);
        setMobileOpen(false);
      } else if (currentY < lastY) {
        setHidden(false);
      }

      lastY = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/85 backdrop-blur-sm"
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:h-24 lg:px-8">
        <Link to="/" className="flex items-center lg:-ml-4">
          <BrandWordmark compact />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`font-body text-sm uppercase tracking-wider transition-colors ${
                location.pathname === link.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            className="p-2 text-foreground transition-colors hover:text-accent"
            aria-label="Search products"
          >
            <Search size={20} />
          </button>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 font-body text-xs uppercase tracking-[0.18em] text-accent-foreground transition-all hover:-translate-y-0.5 hover:bg-foreground hover:text-background hover:shadow-[0_12px_24px_rgba(15,15,16,0.14)] md:inline-flex"
          >
            <MessageCircle size={15} />
            Custom Order
          </a>

          <button
            onClick={() => setMobileOpen((current) => !current)}
            className="p-2 text-foreground md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="border-b border-border/40 bg-background/75 px-4 pb-4 backdrop-blur-md md:hidden"
          >
            <div className="mx-auto mt-2 max-w-md rounded-2xl border border-border/60 bg-background/95 p-3 shadow-[0_18px_40px_rgba(32,24,19,0.12)]">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-body text-sm uppercase tracking-[0.2em] transition-all ${
                    location.pathname === link.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/70 hover:text-foreground"
                  }`}
                >
                  <span>{link.label}</span>
                  <span className="text-xs tracking-normal">{location.pathname === link.href ? "*" : "+"}</span>
                </Link>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_WHATSAPP_MESSAGE)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center rounded-xl bg-accent px-4 py-3 font-body text-sm uppercase tracking-[0.2em] text-accent-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Custom Order
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </motion.nav>
  );
};

export default Navbar;
