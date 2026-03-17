'use client';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const h = t.hero;

  return (
    <section className="relative min-h-screen flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=1800&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/75 to-gray-900/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-primary" />
            <span className="text-primary font-semibold uppercase tracking-widest text-sm">{h.tag}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            {h.line1}
            <br />
            <span className="text-primary">{h.line2}</span>
            <br />
            {h.line3}
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">{h.sub}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary">{h.btn1}</Link>
            <Link href="/contact" className="btn-outline">{h.btn2}</Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {[
            { value: '100+', label: h.stat1 },
            { value: '10+', label: h.stat2 },
            { value: '200+', label: h.stat3 },
            { value: h.stat4, label: '' },
          ].map((item, i) => (
            <div key={i} className="bg-black/30 backdrop-blur-sm px-6 py-5">
              <div className="text-2xl font-black text-white">{item.value}</div>
              <div className="text-gray-400 text-xs uppercase tracking-wide mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
