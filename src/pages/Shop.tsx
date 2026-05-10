import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import PageBackButton from "@/components/PageBackButton";

const Shop = () => {
  return (
    <div className="mono-page relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <CartDrawer />
        <div className="pt-16">
          <div className="container mx-auto px-4 pt-6 lg:px-8">
            <PageBackButton fallbackTo="/" />
          </div>
          <ShopSection />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Shop;
