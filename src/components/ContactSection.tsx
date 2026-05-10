import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  ORDER_WHATSAPP_MESSAGE,
  PHONE_NUMBER_DISPLAY,
  SNAPCHAT_HANDLE,
  SNAPCHAT_URL,
  WHATSAPP_NUMBER,
} from "@/lib/contact";

const ContactSection = () => {
  return (
    <section id="contact" className="section-transparent py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Contact
          </p>
          <h2 className="mb-6 font-display text-4xl font-light text-foreground md:text-5xl">
            Ready to <span className="font-semibold italic">Customize?</span>
          </h2>
          <p className="mb-10 font-body text-lg leading-relaxed text-muted-foreground">
            Browse the collection, screenshot your favorite piece, and message us with your
            customization request. LOUIES accepts <strong className="text-foreground">Mobile Money</strong> and{" "}
            <strong className="text-foreground">card payments</strong>, but the main flow starts with
            a direct WhatsApp conversation so your piece matches your vision.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(ORDER_WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-lift flex items-center gap-2 rounded bg-accent px-8 py-3.5 font-body text-sm uppercase tracking-wider text-accent-foreground hover:bg-foreground hover:text-background"
            >
              <MessageCircle size={18} />
              Start on WhatsApp
            </a>
            <a
              href="tel:+233536036631"
              className="cta-lift flex items-center gap-2 rounded border border-accent bg-accent px-8 py-3.5 font-body text-sm uppercase tracking-wider text-accent-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
            >
              <Phone size={18} />
              Call Louies
            </a>
          </div>

          <div className="flex items-center justify-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
              {INSTAGRAM_HANDLE}
            </a>
            <a
              href={SNAPCHAT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-current text-[10px]">
                S
              </span>
              {SNAPCHAT_HANDLE}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <MessageCircle size={18} />
              {PHONE_NUMBER_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
