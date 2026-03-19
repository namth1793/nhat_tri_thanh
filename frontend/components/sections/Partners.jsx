'use client';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const partners = [
  { name: 'SMS Group',       file: 'sms-group',    country: 'Đức' },
  { name: 'Danieli',         file: 'danieli',       country: 'Ý' },
  { name: 'Primetals',       file: 'primetals',     country: 'Áo' },
  { name: 'SKF',             file: 'skf',           country: 'Thụy Điển' },
  { name: 'Schaeffler',      file: 'schaeffler',    country: 'Đức' },
  { name: 'NSK',             file: 'nsk',           country: 'Nhật Bản' },
  { name: 'Siemens',         file: 'siemens',       country: 'Đức' },
  { name: 'ABB',             file: 'abb',           country: 'Thụy Sĩ' },
  { name: 'Rexnord',         file: 'rexnord',       country: 'Mỹ' },
  { name: 'Vesuvius',        file: 'vesuvius',      country: 'Anh' },
  { name: 'RHI Magnesita',   file: 'rhi-magnesita', country: 'Áo' },
  { name: 'Magneco Metrel',  file: 'magneco',       country: 'Mỹ' },
];

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;

  return (
    <section className="py-10 bg-white overflow-hidden border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-7 text-center">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-1">{p.tag}</p>
        <h2 className="text-xl font-bold text-gray-700">{p.title}</h2>
      </div>

      <div className="relative flex overflow-x-hidden">
        <div className="flex animate-marquee">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 w-40 h-20 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center gap-1 overflow-hidden group"
            >
              <Image
                src={`/logos/${partner.file}.svg`}
                alt={partner.name}
                width={160}
                height={64}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
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
