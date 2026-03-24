'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function News() {
  const { t } = useLanguage();
  const n = t.news;

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{n.tag}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{n.title}</h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {n.articles.map((article, i) => (
            <Link key={i} href={`/news/${article.slug}`} className="bg-white group overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 block">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gray-900/20 group-hover:bg-gray-900/10 transition-colors duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-7">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">{article.date}</p>
                <h3 className="font-bold text-gray-900 text-lg leading-snug mb-3 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                  {article.excerpt}
                </p>
                <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wide group-hover:gap-3 transition-all duration-200">
                  {n.readMore}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
