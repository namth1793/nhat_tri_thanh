import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import About from '../components/sections/About';
import ProductCategories from '../components/sections/ProductCategories';
import Partners from '../components/sections/Partners';
import Industries from '../components/sections/Industries';
import News from '../components/sections/News';
import CTA from '../components/sections/CTA';
import WhyChooseUs from '../components/sections/WhyChooseUs';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <ProductCategories />
      <Partners />
      <Industries />
      <News />
      <CTA />
      <WhyChooseUs />
    </>
  );
}
