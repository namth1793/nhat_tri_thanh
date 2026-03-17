'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const images = [
  'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&q=80',
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=800&q=80',
];

export default function ProductsPage() {
  const { t } = useLanguage();
  const p = t.productsPage;

  return (
    <>
      <section className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=1600&q=80')" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{p.heroTag}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{p.heroTitle}</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {p.cats.map((cat, idx) => (
              <div key={cat.name} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                <div className={`relative h-80 lg:h-96 ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                  <Image src={images[idx]} alt={cat.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                <div className={idx % 2 !== 0 ? 'lg:order-1' : ''}>
                  <div className="w-12 h-1 bg-primary mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{cat.name}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{cat.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {cat.products.map((prod) => (
                      <li key={prod} className="flex items-center gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 bg-primary flex-shrink-0" />
                        {prod}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary inline-block">{p.inquireBtn}</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">{p.ctaTitle}</h2>
          <p className="text-red-100 mb-8 max-w-2xl mx-auto">{p.ctaSub}</p>
          <Link href="/contact" className="btn-outline inline-block">{p.ctaBtn}</Link>
        </div>
      </section>
    </>
  );
}
