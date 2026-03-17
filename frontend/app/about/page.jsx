'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.aboutPage;

  return (
    <>
      {/* Page Hero */}
      <section className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80')" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.heroTag}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{a.heroTitle}</h1>
        </div>
      </section>

      {/* Main About */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-96 lg:h-[500px]">
              <Image src="https://images.unsplash.com/photo-1565689157206-0fddef7589a2?w=800&q=80" alt="Industrial facility" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              <div className="absolute inset-0 bg-primary opacity-10" />
            </div>
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.storyTag}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{a.storyTitle}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>{a.p1}</p><p>{a.p2}</p><p>{a.p3}</p><p>{a.p4}</p>
              </div>
              <div className="mt-8">
                <Link href="/contact" className="btn-primary inline-block">{a.contactBtn}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.missionTag}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 border-t-4 border-primary">
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{a.missionTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{a.missionText}</p>
            </div>
            <div className="bg-white p-10 border-t-4 border-primary">
              <h3 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide">{a.visionTitle}</h3>
              <p className="text-gray-600 leading-relaxed">{a.visionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.milestoneTag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{a.milestoneTitle}</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200 hidden md:block" />
            <div className="space-y-10">
              {a.milestones.map((item, idx) => (
                <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-gray-50 p-6 inline-block w-full md:max-w-sm">
                      <p className="text-primary font-bold text-lg mb-1">{item.year}</p>
                      <p className="text-gray-700">{item.event}</p>
                    </div>
                  </div>
                  <div className="hidden md:flex w-8 h-8 bg-primary rounded-full items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{a.teamTag}</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{a.teamTitle}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {a.team.map((member, idx) => (
              <div key={idx} className="bg-white p-8 text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                <p className="text-primary text-sm font-semibold uppercase tracking-wide mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
