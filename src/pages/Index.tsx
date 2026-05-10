import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import InstagramCTA from "@/components/InstagramCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="mono-page relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <CartDrawer />
        <HeroSection />
        <FeaturedProducts />
        <WhyUs />
        <HowItWorks />
        <InstagramCTA />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
