import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="section-transparent pt-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="order-2 px-2 text-center lg:order-1 lg:px-6 lg:text-left">
            <p className="mb-4 font-body text-[11px] uppercase tracking-[0.34em] text-accent">
              LOUIES STUDIO
            </p>
            <h1 className="mx-auto max-w-3xl font-display text-5xl font-semibold leading-[0.92] text-foreground sm:text-6xl lg:mx-0 lg:text-7xl">
              Custom yarn art
              <br />
              <span className="italic text-accent">for modern spaces.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl font-body text-sm leading-7 text-muted-foreground sm:text-base lg:mx-0">
              Minimal pieces, personalized details, and a soft neutral palette designed to feel elevated, calm, and intentional.
            </p>

            <div className="mt-8">
              <Link
                to="/shop"
                className="cta-lift inline-flex items-center justify-center border border-accent bg-accent px-8 py-3.5 font-body text-[11px] uppercase tracking-[0.24em] text-accent-foreground hover:border-foreground hover:bg-foreground hover:text-background"
              >
                Shop Collection
              </Link>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-[2rem] border border-accent/40 bg-[hsl(var(--cream))] shadow-[0_20px_60px_rgba(15,15,16,0.08)]">
              <img
                src="/hero-yarn-reference.jpeg"
                alt="Yarn bundles in neutral tones for the LOUIES hero section"
                className="aspect-[4/5] w-full object-cover lg:aspect-[5/6]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
