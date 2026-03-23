'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 md:h-[480px] overflow-visible">
            <Image
              src="/images/intro/home-about.png"
              alt="Nhật Trí Thành - Giới thiệu công ty"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary opacity-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary hidden md:block" />
            <div className="absolute top-6 left-6 bg-primary text-white px-4 py-3 shadow-lg">
              <div className="text-3xl font-black">20+</div>
              <div className="text-red-100 text-xs uppercase tracking-wider">Năm kinh nghiệm</div>
            </div>
          </div>

          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.tag}</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">{a.title}</h2>
            <div className="w-12 h-1 bg-primary mb-8" />
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{a.p1}</p>
              <p>{a.p2}</p>
              <p>{a.p3}</p>
              <p>{a.p4}</p>
            </div>
            <div className="mt-8">
              <Link href="/about" className="btn-primary inline-block">{a.btn}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
