'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

const images = [
  'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80',
];

export default function ProductCategories() {
  const { t } = useLanguage();
  const p = t.products;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{p.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{p.title}</h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {p.cats.map((cat, i) => (
            <div key={cat.name} className="bg-white group overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={images[i]}
                  alt={cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/10 transition-colors duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200 leading-tight">{cat.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{cat.desc}</p>
                <Link
                  href={`/products/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wide hover:gap-3 transition-all duration-200"
                >
                  {p.btn}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
