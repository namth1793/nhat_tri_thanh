'use client';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { lang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.products, href: '/products' },
    { label: t.nav.contact, href: '/contact' },
  ];

  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <div className="font-bold text-base leading-tight tracking-tight">NHẬT TRÍ THÀNH</div>
                <div className="text-xs leading-tight tracking-widest uppercase text-red-300">CÔNG TY TNHH</div>
              </div>
            </div>
            <p className="text-red-200 text-sm leading-relaxed max-w-sm">{t.footer.desc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-5 text-white">{t.footer.quicklinks}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-red-200 hover:text-white text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-5 text-white">{t.footer.contact}</h4>
            <ul className="space-y-3 text-sm text-red-200">
              <li style={{ whiteSpace: 'pre-line' }}>{t.footer.address}</li>
              <li><a href="mailto:info@nhattrithanh.vn" className="hover:text-white transition-colors">info@nhattrithanh.vn</a></li>
              <li><a href="tel:+84xxxxxxxxx" className="hover:text-white transition-colors">+84 xxx xxx xxx</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-red-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-red-300 text-xs">© {new Date().getFullYear()} {t.footer.copy}</p>
          <p className="text-red-400 text-xs">{t.footer.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
