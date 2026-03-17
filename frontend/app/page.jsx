import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Stats from '../components/sections/Stats';
import ProductCategories from '../components/sections/ProductCategories';
import Industries from '../components/sections/Industries';
import CTA from '../components/sections/CTA';
import WhyChooseUs from '../components/sections/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <ProductCategories />
      <Industries />
      <CTA />
      <WhyChooseUs />
    </>
  );
}