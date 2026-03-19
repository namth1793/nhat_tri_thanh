'use client';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const partners = [
  { name: 'SMS Group',      logo: 'https://cdn.brandfetch.io/idze6O3Nix/w/669/h/272/idh2e_AJ6o.png',         country: 'Đức' },
  { name: 'Danieli',        logo: 'https://cdn.brandfetch.io/idKzl8I9-B/w/1265/h/256/idFrjTSA7L.jpeg',       country: 'Ý' },
  { name: 'Primetals',      logo: 'https://cdn.brandfetch.io/id8b80z3tN/w/1500/h/500/idwkjFNHd2.jpeg',       country: 'Áo' },
  { name: 'SKF',            logo: 'https://cdn.brandfetch.io/id_HOoslme/w/1500/h/500/theme/dark/id3TkilTU2.jpeg', country: 'Thụy Điển' },
  { name: 'Schaeffler',     logo: 'https://cdn.brandfetch.io/idXUFDYutv/w/851/h/315/theme/dark/idtI2U31WC.jpeg',  country: 'Đức' },
  { name: 'NSK',            logo: '/logos/nsk.svg',                                                           country: 'Nhật Bản' },
  { name: 'Siemens',        logo: 'https://cdn.brandfetch.io/idtwZZpkvB/w/893/h/223/theme/dark/id-U2tRY7y.jpeg',  country: 'Đức' },
  { name: 'ABB',            logo: 'https://cdn.brandfetch.io/idDb-CWxSP/w/1500/h/500/theme/dark/id8S61ap6P.jpeg', country: 'Thụy Sĩ' },
  { name: 'Rexnord',        logo: 'https://cdn.brandfetch.io/idT0E-a8sH/w/1500/h/500/idd66rUzLO.jpeg',       country: 'Mỹ' },
  { name: 'Vesuvius',       logo: '/logos/vesuvius.svg',                                                      country: 'Anh' },
  { name: 'RHI Magnesita',  logo: 'https://cdn.brandfetch.io/id1NQ0V0U-/w/1128/h/191/idSENPGUYj.jpeg',       country: 'Áo' },
  { name: 'Magneco Metrel', logo: '/logos/magneco.svg',                                                       country: 'Mỹ' },
];

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;

  return (
    <section className="py-14 bg-white overflow-hidden border-y border-gray-100">
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
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={64}
                className="w-full h-full object-contain p-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
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
