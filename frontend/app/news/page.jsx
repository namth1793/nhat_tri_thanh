'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function NewsPage() {
  const { t } = useLanguage();
  const n = t.news;

  return (
    <>
      {/* Hero */}
      <div className="bg-gray-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">{n.tag}</p>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase">{n.title}</h1>
          <div className="w-12 h-0.5 bg-primary mx-auto mt-4" />
        </div>
      </div>

      {/* Articles */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {n.articles.map((article, i) => (
              <Link key={i} href={`/news/${article.slug}`} className="bg-white border border-gray-200 hover:border-primary hover:shadow-lg transition-all duration-200 group overflow-hidden block">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wide">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">{article.date}</p>
                  <h2 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-4">
                    {article.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide group-hover:gap-3 transition-all duration-200">
                    {n.readMore}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 bg-gray-900 p-10 text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-2">
              {t.cta.line1}
            </p>
            <h3 className="text-2xl font-black text-white mb-4 uppercase">{t.cta.line2}</h3>
            <Link href="/contact" className="btn-primary inline-block">
              {t.cta.btn}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
