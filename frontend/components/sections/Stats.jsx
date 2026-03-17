'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function Stats() {
  const { t } = useLanguage();
  const s = t.stats;

  const stats = [
    { value: s.s1v, label: s.s1l, desc: s.s1d },
    { value: s.s2v, label: s.s2l, desc: s.s2d },
    { value: s.s3v, label: s.s3l, desc: s.s3d },
    { value: s.s4v, label: s.s4l, desc: s.s4d },
  ];

  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">{s.title}</h2>
          <div className="w-12 h-0.5 bg-red-300 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-red-800">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-primary px-8 py-10 text-center hover:bg-primary-dark transition-colors duration-200">
              <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-red-100 font-semibold uppercase tracking-wide text-sm mb-2">{stat.label}</div>
              <div className="text-red-300 text-sm">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
