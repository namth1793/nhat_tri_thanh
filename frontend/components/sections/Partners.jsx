'use client';
import Image from 'next/image';
import { useLanguage } from '../../context/LanguageContext';

const clients = [
  { name: 'VAS Nghi Sơn',     sub: 'CTCP Tập Đoàn VAS Nghi Sơn',                          logo: '/images/partners/VAS.png' },
  { name: 'Cơ Khí Việt Nhật', sub: 'Công Ty TNHH Cơ Khí Việt Nhật',                       logo: '/images/partners/Công_Ty_TNHH_Cơ_Khí_Việt_Nhật.png' },
  { name: 'Hòa Phát',         sub: 'CTCP Tập Đoàn Hòa Phát',                              logo: '/images/partners/hoà_phát.png' },
  { name: 'Thép Việt Ý',      sub: 'CTCP Thép Việt Ý',                                     logo: '/images/partners/VIS.png' },
  { name: 'Cơ Khí Gang Thép', sub: 'CTCP Cơ Khí Gang Thép',                               logo: '/images/partners/cơ_khí_gang_thep.png' },
  { name: 'Thép Thủ Đức',     sub: 'CTCP Thép Thủ Đức',                                   logo: '/images/partners/thép_thủ_đức.png' },
  { name: 'VNSTEEL',          sub: 'Thép Miền Nam – Tổng Công Ty Thép Việt Nam',           logo: '/images/partners/VNSTEEL.png' },
  { name: 'TISCO',            sub: 'Công Ty Thép TISCO',                                   logo: '/images/partners/TISCO.jpg' },
  { name: 'Thép Việt Đức',    sub: 'Tập Đoàn Thép Việt Đức',                              logo: '/images/partners/thép_việt_đức.png' },
  { name: 'VEAM',             sub: 'Tổng Công Ty Máy Động Lực & Máy Nông Nghiệp VN',      logo: '/images/partners/VEAM.png' },
];

export default function Partners() {
  const { lang } = useLanguage();

  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-1">
            {lang === 'en' ? 'TRUSTED BY' : lang === 'zh' ? '合作客户' : 'KHÁCH HÀNG TIÊU BIỂU'}
          </p>
          <h2 className="text-2xl font-bold text-gray-800">
            {lang === 'en' ? 'Our Valued Customers' : lang === 'zh' ? '我们的重要客户' : 'Đối Tác & Khách Hàng Tin Tưởng'}
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {clients.map((client, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 p-4 flex flex-col items-center justify-center text-center group min-h-[100px]"
            >
              {client.logo ? (
                <div className="relative w-full h-14 mb-2">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                </div>
              ) : (
                <p className="font-bold text-gray-800 text-sm leading-tight group-hover:text-primary transition-colors duration-200 mb-1">{client.name}</p>
              )}
              <p className="text-gray-400 text-xs leading-snug">{client.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
