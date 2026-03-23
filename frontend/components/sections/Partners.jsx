'use client';
import { useLanguage } from '../../context/LanguageContext';

const clients = [
  { name: 'VAS Nghi Sơn',     sub: 'CTCP Tập Đoàn VAS Nghi Sơn' },
  { name: 'Cơ Khí Việt Nhật', sub: 'Công Ty TNHH Cơ Khí Việt Nhật' },
  { name: 'Hòa Phát',         sub: 'CTCP Tập Đoàn Hòa Phát' },
  { name: 'Thép Việt Ý',      sub: 'CTCP Thép Việt Ý' },
  { name: 'Cơ Khí Gang Thép', sub: 'CTCP Cơ Khí Gang Thép' },
  { name: 'Thép Thủ Đức',     sub: 'CTCP Thép Thủ Đức' },
  { name: 'VNSTEEL',          sub: 'Thép Miền Nam – Tổng Công Ty Thép Việt Nam' },
  { name: 'TISCO',            sub: 'Công Ty Thép TISCO' },
  { name: 'Thép Việt Đức',    sub: 'Tập Đoàn Thép Việt Đức' },
  { name: 'VEAM',             sub: 'Tổng Công Ty Máy Động Lực & Máy Nông Nghiệp VN' },
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
              className="bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 p-5 flex flex-col items-center justify-center text-center group min-h-[100px]"
            >
              <p className="font-bold text-gray-800 text-sm leading-tight group-hover:text-primary transition-colors duration-200 mb-1">{client.name}</p>
              <p className="text-gray-400 text-xs leading-snug">{client.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
