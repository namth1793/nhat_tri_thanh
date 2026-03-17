'use client';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();
  const c = t.cta;

  return (
    <section className="relative py-28">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1800&q=80')" }}
      />
      <div className="absolute inset-0 bg-gray-950/80" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-1 bg-primary mx-auto mb-8" />
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">{c.line1}</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 uppercase">{c.line2}</h3>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">{c.sub}</p>
        <Link href="/contact" className="btn-primary text-base px-10 py-4 inline-block">{c.btn}</Link>
      </div>
    </section>
  );
}
