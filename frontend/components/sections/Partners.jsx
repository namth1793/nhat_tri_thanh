'use client';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

// Dùng Clearbit Logo API để lấy logo thật của từng công ty
const partners = [
  { name: 'SMS Group',       domain: 'sms-group.com',       country: 'Đức' },
  { name: 'Danieli',         domain: 'danieli.com',          country: 'Ý' },
  { name: 'Primetals',       domain: 'primetals.com',        country: 'Áo' },
  { name: 'SKF',             domain: 'skf.com',              country: 'Thụy Điển' },
  { name: 'Schaeffler / FAG',domain: 'schaeffler.com',       country: 'Đức' },
  { name: 'NSK',             domain: 'nsk.com',              country: 'Nhật Bản' },
  { name: 'Siemens',         domain: 'siemens.com',          country: 'Đức' },
  { name: 'ABB',             domain: 'abb.com',              country: 'Thụy Sĩ' },
  { name: 'Rexnord',         domain: 'rexnord.com',          country: 'Mỹ' },
  { name: 'Vesuvius',        domain: 'vesuvius.com',         country: 'Anh' },
  { name: 'RHI Magnesita',   domain: 'rhimagnesita.com',     country: 'Áo' },
  { name: 'Magneco Metrel',  domain: 'magnecometrel.com',    country: 'Mỹ' },
];

function PartnerLogo({ partner }) {
  const logoUrl = `https://logo.clearbit.com/${partner.domain}`;

  return (
    <div className="flex-shrink-0 mx-3 w-44 h-24 bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-2 px-4 group cursor-default">
      <div className="relative w-28 h-10">
        <Image
          src={logoUrl}
          alt={partner.name}
          fill
          className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
          sizes="112px"
          onError={(e) => {
            // Nếu logo không load được, ẩn ảnh và hiển thị tên
            e.target.style.display = 'none';
            e.target.nextSibling && (e.target.nextSibling.style.display = 'block');
          }}
        />
        <span className="hidden text-xs font-bold text-gray-600 text-center leading-tight">{partner.name}</span>
      </div>
      <span className="text-xs text-gray-400 group-hover:text-primary transition-colors duration-200">{partner.country}</span>
    </div>
  );
}

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;

  return (
    <section className="py-12 bg-gray-50 overflow-hidden border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-1">{p.tag}</p>
        <h2 className="text-xl font-bold text-gray-700">{p.title}</h2>
      </div>

      {/* Marquee */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, i) => (
            <PartnerLogo key={i} partner={partner} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
          white-space: nowrap;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
