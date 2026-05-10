import { Link } from "react-router-dom";
import CurrencySelect from "@/components/CurrencySelect";
import { useSales } from "@/context/SalesContext";
import { BRAND_NAME, INSTAGRAM_HANDLE, PHONE_NUMBER_DISPLAY } from "@/lib/contact";
import BrandWordmark from "./BrandWordmark";

const Footer = () => {
  const { isLive } = useSales();

  return (
    <footer className="border-t border-accent/35 bg-[hsl(var(--soft-beige))] py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-start md:text-left">
          <div>
            <BrandWordmark compact className="mb-2" />
            <p className="font-body text-xs text-muted-foreground">
              Custom yarn art with a bold black, white, and gold finish.
            </p>
            <p className="mt-2 font-body text-xs text-muted-foreground">
              {INSTAGRAM_HANDLE} • WhatsApp {PHONE_NUMBER_DISPLAY}
            </p>
          </div>

          <div>
            <p className="mb-2 font-body text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Quick Links
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
              <Link
                to="/"
                className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Shop
              </Link>
              {isLive ? (
                <Link
                  to="/sales"
                  className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  Sales
                </Link>
              ) : null}
              <Link
                to="/about"
                className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="font-body text-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="md:text-right">
            <CurrencySelect />
          </div>
        </div>

        <p className="mt-6 text-center font-body text-xs text-muted-foreground">
          {"\u00A9"} {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
