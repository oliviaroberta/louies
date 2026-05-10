import { motion } from "framer-motion";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  PHONE_NUMBER_DISPLAY,
  SNAPCHAT_HANDLE,
  SNAPCHAT_URL,
} from "@/lib/contact";

const InstagramCTA = () => {
  return (
    <section className="section-transparent py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Socials
          </p>
          <h2 className="mb-5 font-display text-4xl font-light text-foreground md:text-5xl">
            <span className="italic font-semibold">{INSTAGRAM_HANDLE}</span>
          </h2>
          <p className="mb-8 font-body text-lg leading-relaxed text-muted-foreground">
            See new drops, styling inspiration, and customization ideas on Instagram, then continue
            the conversation on Snapchat or WhatsApp.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-lift inline-flex items-center gap-2 rounded bg-accent px-10 py-3.5 font-body text-sm uppercase tracking-wider text-accent-foreground hover:bg-foreground hover:text-background"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              Follow on Instagram
            </a>
            <a
              href={SNAPCHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-lift inline-flex items-center gap-2 rounded border border-accent bg-accent px-10 py-3.5 font-body text-sm uppercase tracking-wider text-accent-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-current text-[10px]">
                S
              </span>
              Add on Snapchat
            </a>
          </div>
          <p className="mt-5 font-body text-sm text-muted-foreground">
            WhatsApp: {PHONE_NUMBER_DISPLAY} • Snapchat: {SNAPCHAT_HANDLE}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default InstagramCTA;
