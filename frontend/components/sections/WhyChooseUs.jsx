'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();
  const w = t.why;

  const reasons = [
    { title: w.r1t, desc: w.r1d },
    { title: w.r2t, desc: w.r2d },
    { title: w.r3t, desc: w.r3d },
    { title: w.r4t, desc: w.r4d },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{w.tag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{w.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-8">{w.sub}</p>
            <div className="flex flex-col gap-4">
              {reasons.map((r, idx) => (
                <div key={r.title} className="flex gap-5 items-start">
                  <div className="w-8 h-8 bg-primary flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{r.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary text-white p-8 flex flex-col justify-end h-52">
              <div className="text-4xl font-black mb-1">100+</div>
              <div className="text-red-200 text-sm uppercase tracking-wide">{w.statA}</div>
            </div>
            <div className="h-52 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=500&q=80')" }} />
            <div className="h-52 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80')" }} />
            <div className="bg-gray-900 text-white p-8 flex flex-col justify-end h-52">
              <div className="text-4xl font-black mb-1">10+</div>
              <div className="text-gray-400 text-sm uppercase tracking-wide">{w.statB}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
