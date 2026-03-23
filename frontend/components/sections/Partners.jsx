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

const clients = [
  { name: 'VAS Nghi Sơn', short: 'VAS', sub: 'CTCP Tập Đoàn VAS Nghi Sơn' },
  { name: 'Cơ Khí Việt Nhật', short: 'VNJ', sub: 'Công Ty TNHH Cơ Khí Việt Nhật' },
  { name: 'Hòa Phát', short: 'HPG', sub: 'CTCP Tập Đoàn Hòa Phát' },
  { name: 'Thép Việt Ý', short: 'VIS', sub: 'CTCP Thép Việt Ý' },
  { name: 'Cơ Khí Gang Thép', short: 'CKGT', sub: 'CTCP Cơ Khí Gang Thép' },
  { name: 'Thép Thủ Đức', short: 'TĐ', sub: 'CTCP Thép Thủ Đức' },
  { name: 'VNSTEEL', short: 'VNS', sub: 'Thép Miền Nam – Tổng Công Ty Thép Việt Nam' },
  { name: 'TISCO', short: 'TIS', sub: 'Công Ty Thép TISCO' },
  { name: 'Thép Việt Đức', short: 'VGS', sub: 'Tập Đoàn Thép Việt Đức' },
  { name: 'VEAM', short: 'VEA', sub: 'Tổng Công Ty Máy Động Lực & Máy Nông Nghiệp VN' },
];

export default function Partners() {
  const { t, lang } = useLanguage();
  const p = t.partners;

  return (
    <>
      {/* International Partners / Suppliers */}
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
      </section>

      {/* Vietnamese Client Companies */}
      <section className="py-16 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-1">
              {lang === 'en' ? 'TRUSTED BY' : lang === 'zh' ? '合作客户' : 'KHÁCH HÀNG TIÊU BIỂU'}
            </p>
            <h2 className="text-xl font-bold text-gray-700">
              {lang === 'en' ? 'Our Valued Customers' : lang === 'zh' ? '我们的重要客户' : 'Đối Tác & Khách Hàng Tin Tưởng'}
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {clients.map((client, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center justify-center text-center group min-h-[90px]"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center mb-2 transition-colors duration-200">
                  <span className="text-primary font-bold text-xs leading-tight">{client.short}</span>
                </div>
                <p className="font-semibold text-gray-800 text-xs leading-tight group-hover:text-primary transition-colors duration-200">{client.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
    </>
  );
}
