'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  const feats = [
    { title: a.feat1t, desc: a.feat1d },
    { title: a.feat2t, desc: a.feat2d },
    { title: a.feat3t, desc: a.feat3d },
    { title: a.feat4t, desc: a.feat4d },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-80 md:h-[480px]">
            <Image
              src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&q=80"
              alt="Industrial facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-primary opacity-10" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary hidden md:block" />
          </div>

          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.tag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">{a.title}</h2>
            <div className="w-12 h-1 bg-primary mb-8" />
            <p className="text-gray-600 leading-relaxed mb-5">{a.p1}</p>
            <p className="text-gray-600 leading-relaxed mb-8">{a.p2}</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {feats.map((f) => (
                <div key={f.title} className="border-l-2 border-primary pl-4">
                  <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                  <p className="text-gray-500 text-sm mt-0.5">{f.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary inline-block">{a.btn}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
