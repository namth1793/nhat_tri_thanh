'use client';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const images = [
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&q=80',
  'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=600&q=80',
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
];

export default function Industries() {
  const { t } = useLanguage();
  const ind = t.industries;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{ind.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{ind.title}</h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ind.items.map((item, i) => (
            <div key={item.name} className="group relative overflow-hidden h-80">
              <Image
                src={images[i]}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-bold text-white text-lg mb-2">{item.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-24 overflow-hidden">
                  {item.desc}
                </p>
                <div className="w-8 h-0.5 bg-primary mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
