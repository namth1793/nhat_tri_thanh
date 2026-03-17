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
  const { lang, t, toggle } = useLanguage();
  const cats = categoryLinks[lang];

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.products, href: '/products', hasDropdown: true },
    { label: t.nav.contact, href: '/contact' },
  ];

  const isProductsActive = pathname === '/products' || pathname.startsWith('/products/');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div>
              <div className="font-bold text-base leading-tight tracking-tight text-gray-900">NHẬT TRÍ THÀNH</div>
              <div className="text-xs leading-tight tracking-widest uppercase text-gray-500">CÔNG TY TNHH</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
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

                  {/* Dropdown */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white shadow-xl border-t-2 border-primary w-56">
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

            {/* Language toggle */}
            <button
              onClick={toggle}
              className="flex items-center gap-1 text-xs font-bold border border-gray-300 px-2.5 py-1.5 tracking-widest text-gray-600 hover:border-primary hover:text-primary transition-colors duration-200"
            >
              <span className={lang === 'vi' ? 'text-primary font-black' : ''}>VI</span>
              <span className="text-gray-300">|</span>
              <span className={lang === 'en' ? 'text-primary font-black' : ''}>EN</span>
            </button>

            <Link href="/contact" className="btn-primary text-xs py-2 px-5">{t.nav.quote}</Link>
          </nav>

          {/* Mobile buttons */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggle} className="text-xs font-bold border border-gray-300 px-2 py-1 tracking-widest text-gray-600">
              {lang === 'vi' ? 'EN' : 'VI'}
            </button>
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

            {/* Mobile Products accordion */}
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
                    {lang === 'vi' ? '→ Xem tất cả' : '→ View all'}
                  </Link>
                </div>
              )}
            </div>

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
