'use client';
import { useLanguage } from '../../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contactPage;

  return (
    <>
      <section className="relative bg-gray-900 py-24">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80')" }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{c.heroTag}</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{c.heroTitle}</h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">{c.infoTag}</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{c.infoTitle}</h2>
              <p className="text-gray-600 mb-10 leading-relaxed">{c.infoSub}</p>

              <div className="space-y-8">
                {[
                  {
                    label: c.addrLabel,
                    content: <span style={{ whiteSpace: 'pre-line' }}>{c.address}</span>,
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />,
                  },
                  {
                    label: c.emailLabel,
                    content: <><a href="mailto:info@nhattrithanh.vn" className="hover:text-primary transition-colors">info@nhattrithanh.vn</a><br /><a href="mailto:sales@nhattrithanh.vn" className="hover:text-primary transition-colors">sales@nhattrithanh.vn</a></>,
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                  },
                  {
                    label: c.phoneLabel,
                    content: <><a href="tel:+84xxxxxxxxx" className="hover:text-primary transition-colors">+84 xxx xxx xxx</a><br /><a href="tel:+84xxxxxxxxx" className="hover:text-primary transition-colors">+84 xxx xxx xxx</a></>,
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                  },
                  {
                    label: c.hoursLabel,
                    content: <>{c.hours1}<br />{c.hours2}</>,
                    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <div className="w-10 h-10 bg-primary flex-shrink-0 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 uppercase tracking-wide text-sm mb-1">{item.label}</p>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-8 md:p-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 uppercase tracking-wide">{c.formTitle}</h3>
              <form className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.nameLabel}</label>
                    <input type="text" className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white" placeholder={c.namePh} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.companyLabel}</label>
                    <input type="text" className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white" placeholder={c.companyPh} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.emailFLabel}</label>
                  <input type="email" className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.phoneFLabel}</label>
                  <input type="tel" className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white" placeholder="+84 xxx xxx xxx" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.subjectLabel}</label>
                  <select className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white">
                    <option value="">{c.subjectPh}</option>
                    {c.subjectOpts.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">{c.messageLabel}</label>
                  <textarea rows={5} className="w-full border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:border-primary bg-white resize-none" placeholder={c.messagePh} />
                </div>
                <button type="submit" className="btn-primary w-full text-center">{c.sendBtn}</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 h-64 flex items-center justify-center">
        <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">{c.mapPh}</p>
      </section>
    </>
  );
}
