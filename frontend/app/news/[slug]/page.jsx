'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { newsArticles } from '../../../data/newsData';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const { lang, t } = useLanguage();

  const effectiveLang = lang === 'en' ? 'en' : 'vi';
  const article = newsArticles[slug]?.[effectiveLang];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {lang === 'vi' ? 'Không tìm thấy bài viết' : 'Article not found'}
          </h1>
          <Link href="/news" className="btn-primary inline-block">
            {lang === 'vi' ? 'Xem tất cả tin tức' : 'View all news'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <div className="bg-gray-900 pt-20">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover opacity-40"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
              <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wide mb-3">
                {article.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-snug">
                {article.title}
              </h1>
              <p className="text-gray-400 text-sm mt-3">{article.date}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">
              {lang === 'vi' ? 'Trang chủ' : 'Home'}
            </Link>
            <span>/</span>
            <Link href="/news" className="hover:text-primary transition-colors">
              {lang === 'vi' ? 'Tin tức' : 'News'}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article body */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Intro */}
          <p className="text-lg text-gray-700 leading-relaxed border-l-4 border-primary pl-5 mb-10 italic">
            {article.intro}
          </p>

          {/* Sections */}
          <div className="space-y-10">
            {article.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-1 h-6 bg-primary flex-shrink-0" />
                  {section.heading}
                </h2>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {section.body.split('\n\n').map((para, j) => {
                    if (para.startsWith('- ') || para.includes('\n- ')) {
                      const lines = para.split('\n').filter(Boolean);
                      return (
                        <ul key={j} className="space-y-2 ml-1">
                          {lines.map((line, k) => {
                            const text = line.replace(/^- /, '');
                            const bold = text.match(/^\*\*(.*?)\*\*(.*)$/);
                            return (
                              <li key={k} className="flex gap-2 items-start">
                                <div className="w-1.5 h-1.5 bg-primary flex-shrink-0 mt-2 rounded-full" />
                                <span>
                                  {bold ? (
                                    <><strong>{bold[1]}</strong>{bold[2]}</>
                                  ) : text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      );
                    }
                    return (
                      <p key={j}>
                        {para.split(/(\*\*.*?\*\*)/).map((part, k) => {
                          const match = part.match(/^\*\*(.*)\*\*$/);
                          return match ? <strong key={k}>{match[1]}</strong> : part;
                        })}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wide hover:gap-3 transition-all duration-200"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                {lang === 'vi' ? 'Quay lại tin tức' : 'Back to news'}
              </Link>
              <Link href="/contact" className="btn-primary">
                {lang === 'vi' ? 'Liên hệ tư vấn' : 'Contact us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Other articles */}
      <section className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">
            {lang === 'vi' ? 'Bài viết khác' : 'Other articles'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {t.news.articles
              .filter((a) => a.slug !== slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/news/${a.slug}`}
                  className="bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group overflow-hidden flex gap-4 p-4"
                >
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden">
                    <Image src={a.image} alt={a.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div>
                    <span className="text-xs text-primary font-bold uppercase">{a.category}</span>
                    <p className="font-semibold text-gray-900 text-sm leading-snug mt-1 group-hover:text-primary transition-colors line-clamp-2">
                      {a.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{a.date}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
