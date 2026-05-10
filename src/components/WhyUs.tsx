import { motion } from "framer-motion";
import { Gift, Palette, Smartphone, Sparkles } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Luxury Finish", text: "Clean, elevated yarn art built to stand out in modern spaces." },
  { icon: Palette, title: "Custom Colourways", text: "We can tailor tones and styling details around your preference." },
  { icon: Smartphone, title: "Easy Ordering", text: "Send your idea on WhatsApp and confirm payment by MoMo or card." },
  { icon: Gift, title: "Made To Gift", text: "Perfect for birthdays, room makeovers, launches, and meaningful keepsakes." },
];

const WhyUs = () => {
  return (
    <section className="section-solid py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <p className="mb-3 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Why LOUIES
          </p>
          <h2 className="font-display text-4xl font-light text-foreground md:text-5xl">
            Crafted for the <span className="italic font-semibold">Bold Aesthetic</span>
          </h2>
        </motion.div>

        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
                <item.icon size={22} className="text-accent" />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
