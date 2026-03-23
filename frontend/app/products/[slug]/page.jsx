'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLanguage } from '../../../context/LanguageContext';
import { categoryData, subProductData, ui } from '../../../data/productData';

export default function ProductCategoryPage() {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const [selectedSub, setSelectedSub] = useState(0);

  const effectiveLang = categoryData[lang] ? lang : 'en';
  const cats = categoryData[effectiveLang];
  const cat = cats.find((c) => c.slug === slug);
  const t = ui[effectiveLang] || ui['en'];

  const subLang = subProductData[effectiveLang] ? effectiveLang : 'en';
  const subs = (subProductData[subLang] && subProductData[subLang][slug]) || [];
  const activeSub = subs[selectedSub];

  if (!cat) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{lang === 'vi' ? 'Không tìm thấy danh mục' : 'Category not found'}</h1>
          <Link href="/products" className="btn-primary inline-block">{lang === 'vi' ? 'Xem tất cả sản phẩm' : 'View all products'}</Link>
        </div>
      </div>
    );
  }

  const mainImage = activeSub ? activeSub.image : cat.heroImage;

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-100 border-b border-gray-200 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary transition-colors">{t.breadcrumbProducts}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{cat.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero: Image + Info */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Main image + Sub-product thumbnail strip */}
            <div>
              <div className="relative h-80 md:h-[420px] bg-gray-100 overflow-hidden">
                <Image
                  src={mainImage}
                  alt={activeSub ? activeSub.name : cat.name}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Sub-product thumbnail strip */}
              {subs.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                  {subs.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSub(i)}
                      title={sub.name}
                      className={`flex-shrink-0 w-16 h-16 relative border-2 transition-colors ${
                        selectedSub === i ? 'border-primary' : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image src={sub.image} alt={sub.name} fill className="object-cover" sizes="64px" />
                      {selectedSub === i && (
                        <div className="absolute inset-0 bg-primary/20" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Info — updates with selected sub-product */}
            <div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-2">{cat.name}</p>

              {/* Sub-product name */}
              <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 leading-tight">
                {activeSub ? activeSub.name : cat.name}
              </h1>

              {/* Tag badge + application */}
              {activeSub && (
                <div className="mb-5">
                  {activeSub.tag && (
                    <span className="inline-block bg-primary text-white text-xs font-bold px-3 py-1 uppercase tracking-wide mr-2 mb-2">
                      {activeSub.tag}
                    </span>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed">{activeSub.app}</p>
                </div>
              )}

              {!activeSub && (
                <p className="text-gray-500 italic mb-6">{cat.tagline}</p>
              )}

              {/* Specs table */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <div className="w-4 h-0.5 bg-primary" />
                  {t.specsTitle}
                </h3>
                <table className="w-full border border-gray-200 text-sm">
                  <tbody>
                    {cat.specs.map((spec, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="py-2.5 px-4 font-semibold text-gray-700 border-r border-gray-200 w-2/5">{spec.label}</td>
                        <td className="py-2.5 px-4 text-gray-900">{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sub-product navigation dots */}
              {subs.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {subs.map((sub, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSub(i)}
                      className={`text-xs px-2.5 py-1 border transition-colors duration-150 ${
                        selectedSub === i
                          ? 'bg-primary text-white border-primary'
                          : 'border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {cat.badges.map((b) => (
                  <span key={b} className="border border-primary text-primary text-xs font-semibold px-3 py-1.5 uppercase tracking-wide">
                    {b}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="btn-primary text-center flex-1">
                  {t.ctaBtn}
                </Link>
                <a href="tel:+84xxxxxxxxx" className="flex-1 border-2 border-primary text-primary font-semibold text-sm text-center px-6 py-3 uppercase tracking-wide hover:bg-primary hover:text-white transition-colors duration-200">
                  {t.ctaPhone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-product list (full grid) */}
      {subs.length > 0 && (
        <section className="bg-gray-50 py-12 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-1 h-6 bg-primary" />
              {lang === 'vi' ? 'Danh Sách Sản Phẩm' : lang === 'zh' ? '产品列表' : 'Product List'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {subs.map((sub, i) => (
                <button
                  key={i}
                  onClick={() => { setSelectedSub(i); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`text-left border transition-all duration-200 group ${
                    selectedSub === i ? 'border-primary shadow-sm' : 'border-gray-200 hover:border-primary'
                  }`}
                >
                  <div className="relative h-36 overflow-hidden bg-gray-100">
                    <Image
                      src={sub.image}
                      alt={sub.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-400"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    />
                    <div className={`absolute top-2 right-2 text-white text-xs px-2 py-0.5 font-semibold ${selectedSub === i ? 'bg-primary' : 'bg-gray-700'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    {sub.tag && (
                      <div className="absolute top-2 left-2 bg-white/90 text-primary text-xs font-bold px-2 py-0.5">
                        {sub.tag}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className={`font-semibold text-sm leading-tight transition-colors ${selectedSub === i ? 'text-primary' : 'text-gray-900 group-hover:text-primary'}`}>
                      {sub.name}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{sub.app}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-3">
            <div className="w-1 h-6 bg-primary" />
            {t.descTitle}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">{cat.description}</p>
          <ul className="space-y-3">
            {cat.descriptionPoints.map((point, i) => (
              <li key={i} className="flex gap-3 items-start text-gray-700">
                <div className="w-5 h-5 bg-primary flex-shrink-0 flex items-center justify-center mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Ordering Process */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-3">{t.processTitle}</h2>
            <div className="w-12 h-0.5 bg-primary mx-auto mb-4" />
            <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">{t.processSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-8 border-l-4 border-primary">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-primary flex items-center justify-center text-white font-black text-xl flex-shrink-0">01</div>
                <h3 className="text-lg font-bold text-white">{t.step1Title}</h3>
              </div>
              <ul className="space-y-3">
                {t.step1Points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary flex-shrink-0 mt-2 rounded-full" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-800 p-8 border-l-4 border-gray-600">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-gray-600 flex items-center justify-center text-white font-black text-xl flex-shrink-0">02</div>
                <h3 className="text-lg font-bold text-white">{t.step2Title}</h3>
              </div>
              <ul className="space-y-3">
                {t.step2Points.map((pt, i) => (
                  <li key={i} className="flex gap-3 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 bg-gray-500 flex-shrink-0 mt-2 rounded-full" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">Nhất Trí Thành</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.whyTitle}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{t.whySub}</p>
              <Link href="/contact" className="btn-primary inline-block">{t.whyBtn}</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {t.whyFeats.map((feat, i) => (
                <div key={i} className="border border-gray-200 p-5 hover:border-primary hover:shadow-sm transition-all duration-200">
                  <div className="w-8 h-8 bg-primary flex items-center justify-center text-white font-black text-sm mb-3">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1.5">{feat.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{t.ctaTitle}</h2>
              <p className="text-red-100 text-sm max-w-xl">{t.ctaSub}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href="/contact" className="btn-outline whitespace-nowrap">{t.ctaBtn}</Link>
              <a href="tel:+84xxxxxxxxx" className="bg-white text-primary font-bold text-sm px-6 py-3 uppercase tracking-wide hover:bg-gray-100 transition-colors whitespace-nowrap text-center">
                {t.ctaPhone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other categories */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-5">
            {lang === 'vi' ? 'Danh mục sản phẩm khác' : lang === 'zh' ? '其他产品类别' : 'Other product categories'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cats.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="flex items-center gap-4 bg-white border border-gray-200 p-4 hover:border-primary hover:shadow-sm transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">{c.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-tight">{c.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
