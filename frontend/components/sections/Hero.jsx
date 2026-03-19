'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

const slides = [
  'https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=1800&q=80',
  'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=80',
  'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=1800&q=80',
];

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setAnimKey((k) => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-16 md:-mt-20">
      {/* Background slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/80" />

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setAnimKey((k) => k + 1); }}
            className={`transition-all duration-300 ${i === current ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Tag */}
          <div
            key={`tag-${animKey}`}
            className="flex items-center justify-center gap-3 mb-5"
            style={{ animation: 'fadeInUp 0.6s ease both' }}
          >
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">{h.tag}</span>
          </div>

          {/* Sub1 */}
          <p
            key={`sub1-${animKey}`}
            className="text-gray-300 text-base tracking-wide mb-3"
            style={{ animation: 'fadeInUp 0.6s ease 0.1s both' }}
          >
            {h.sub1}
          </p>

          {/* Main headline */}
          <h1
            key={`main-${animKey}`}
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-loose mb-4 uppercase"
            style={{ animation: 'fadeInUp 0.7s ease 0.2s both' }}
          >
            {h.main}
          </h1>

          {/* Sub2 */}
          <p
            key={`sub2-${animKey}`}
            className="text-gray-300 text-base leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ animation: 'fadeInUp 0.6s ease 0.35s both' }}
          >
            {h.sub2}
          </p>

          {/* Buttons */}
          <div
            key={`btns-${animKey}`}
            className="flex flex-wrap gap-4 justify-center"
            style={{ animation: 'fadeInUp 0.6s ease 0.5s both' }}
          >
            <Link href="/products" className="btn-primary">{h.btn1}</Link>
            <Link href="/contact" className="btn-outline">{h.btn2}</Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
