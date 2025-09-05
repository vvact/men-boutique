import HeroSection from "../components/Home/HeroSection";
import FeaturedCollections from "../components/Home/FeaturedCollections";
import NewArrivals from "../components/Home/NewArrivals";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import InstagramSection from "../components/Home/InstagramSection";
import Promotions from "../components/Home/Promotions";
import Brands from "../components/Home/Brands";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedCollections />
      <NewArrivals />
      <FeaturedProducts />
      <InstagramSection />
      <Promotions />
      <Brands />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
