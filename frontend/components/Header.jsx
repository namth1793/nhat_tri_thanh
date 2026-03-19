'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';
import { categoryLinks } from '../data/productData';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const pathname = usePathname();
  const { lang, t, setLanguage } = useLanguage();
  const cats = categoryLinks[lang] || categoryLinks['en'];

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.products, href: '/products', hasDropdown: true },
    { label: t.nav.news, href: '/news' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const isProductsActive = pathname === '/products' || pathname.startsWith('/products/');
  const languages = ['VI', 'EN', 'ZH'];
  const nextLang = lang === 'vi' ? 'en' : lang === 'en' ? 'zh' : 'vi';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 40 40" className="w-8 h-8 fill-white">
                <rect x="4" y="8" width="4" height="24" />
                <rect x="4" y="8" width="20" height="4" />
                <rect x="4" y="18" width="14" height="4" />
                <rect x="22" y="8" width="4" height="24" />
                <rect x="28" y="8" width="4" height="24" />
                <rect x="28" y="8" width="8" height="4" />
                <rect x="28" y="18" width="8" height="4" />
                <rect x="28" y="28" width="8" height="4" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-sm leading-tight tracking-wide text-gray-900">NHAT TRI THANH CO., LTD</div>
              <div className="text-xs leading-tight tracking-wide text-gray-500">CÔNG TY TNHH NHẤT TRÍ THÀNH</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative group">
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                      isProductsActive ? 'text-primary' : 'text-gray-700 hover:text-primary'
                    }`}
                  >
                    {link.label}
                    <svg className="w-3 h-3 mt-0.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white shadow-xl border-t-2 border-primary w-64">
                      {cats.map((cat, i) => (
                        <Link
                          key={cat.slug}
                          href={`/products/${cat.slug}`}
                          className={`block px-5 py-3 text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-primary transition-colors duration-150 ${i !== cats.length - 1 ? 'border-b border-gray-100' : ''}`}
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                    pathname === link.href ? 'text-primary' : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}

            {/* Language toggle: VI / EN / ZH */}
            <div className="flex items-center border border-gray-300 text-xs font-bold tracking-widest overflow-hidden">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l.toLowerCase())}
                  className={`px-2.5 py-1.5 transition-colors duration-150 ${
                    lang === l.toLowerCase()
                      ? 'bg-primary text-white'
                      : 'text-gray-600 hover:text-primary'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link href="/contact" className="btn-primary text-xs py-2 px-5">{t.nav.quote}</Link>
          </nav>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center border border-gray-300 text-xs font-bold tracking-widest overflow-hidden">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLanguage(l.toLowerCase())}
                  className={`px-2 py-1 transition-colors duration-150 ${
                    lang === l.toLowerCase() ? 'bg-primary text-white' : 'text-gray-600'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
            <button className="p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
              <div className="w-6 h-0.5 mb-1.5 bg-gray-900" />
              <div className="w-6 h-0.5 mb-1.5 bg-gray-900" />
              <div className="w-6 h-0.5 bg-gray-900" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link href="/" className={`block py-3 px-4 text-sm font-semibold uppercase tracking-wider ${pathname === '/' ? 'text-primary bg-red-50' : 'text-gray-700'}`} onClick={() => setMobileOpen(false)}>{t.nav.home}</Link>
            <Link href="/about" className={`block py-3 px-4 text-sm font-semibold uppercase tracking-wider ${pathname === '/about' ? 'text-primary bg-red-50' : 'text-gray-700'}`} onClick={() => setMobileOpen(false)}>{t.nav.about}</Link>

            <div>
              <button
                className={`w-full flex items-center justify-between py-3 px-4 text-sm font-semibold uppercase tracking-wider ${isProductsActive ? 'text-primary bg-red-50' : 'text-gray-700'}`}
                onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              >
                {t.nav.products}
                <svg className={`w-4 h-4 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileProductsOpen && (
                <div className="bg-gray-50 border-l-2 border-primary ml-4">
                  {cats.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/products/${cat.slug}`}
                      className="block py-2.5 px-4 text-sm text-gray-700 hover:text-primary border-b border-gray-100 last:border-0"
                      onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }}
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <Link href="/products" className="block py-2.5 px-4 text-sm text-primary font-semibold" onClick={() => { setMobileOpen(false); setMobileProductsOpen(false); }}>
                    {lang === 'vi' ? '→ Xem tất cả' : lang === 'zh' ? '→ 查看全部' : '→ View all'}
                  </Link>
                </div>
              )}
            </div>

            <Link href="/news" className={`block py-3 px-4 text-sm font-semibold uppercase tracking-wider ${pathname === '/news' ? 'text-primary bg-red-50' : 'text-gray-700'}`} onClick={() => setMobileOpen(false)}>{t.nav.news}</Link>
            <Link href="/contact" className={`block py-3 px-4 text-sm font-semibold uppercase tracking-wider ${pathname === '/contact' ? 'text-primary bg-red-50' : 'text-gray-700'}`} onClick={() => setMobileOpen(false)}>{t.nav.contact}</Link>
            <div className="pt-2">
              <Link href="/contact" className="btn-primary block text-center text-xs" onClick={() => setMobileOpen(false)}>{t.nav.quote}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
