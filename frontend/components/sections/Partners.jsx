'use client';
import { useLanguage } from '../../context/LanguageContext';

const partners = [
  { name: 'SMS Group', country: 'Đức' },
  { name: 'Danieli', country: 'Ý' },
  { name: 'Primetals', country: 'Áo' },
  { name: 'SKF', country: 'Thụy Điển' },
  { name: 'FAG / Schaeffler', country: 'Đức' },
  { name: 'NSK', country: 'Nhật Bản' },
  { name: 'Siemens', country: 'Đức' },
  { name: 'ABB', country: 'Thụy Sĩ' },
  { name: 'Rexnord', country: 'Mỹ' },
  { name: 'Magneco Metrel', country: 'Mỹ' },
  { name: 'Vesuvius', country: 'Anh' },
  { name: 'RHI Magnesita', country: 'Áo' },
];

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;

  return (
    <section className="py-12 bg-gray-50 overflow-hidden border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-1">{p.tag}</p>
        <h2 className="text-xl font-bold text-gray-700">{p.title}</h2>
      </div>

      {/* Marquee track */}
      <div className="relative flex overflow-x-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((partner, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-4 flex flex-col items-center justify-center bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 px-8 py-4 min-w-[160px] group"
            >
              <div className="w-8 h-0.5 bg-primary mb-2 group-hover:w-12 transition-all duration-300" />
              <span className="font-bold text-gray-700 text-sm group-hover:text-primary transition-colors duration-200">{partner.name}</span>
              <span className="text-gray-400 text-xs mt-0.5">{partner.country}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
