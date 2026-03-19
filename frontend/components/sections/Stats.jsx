'use client';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseInt(target.replace(/\D/g, '')) || 0;
    if (num === 0) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * num));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

function StatCard({ value, label, delay, started }) {
  const num = useCountUp(value, 1800, started);
  const suffix = value.replace(/[\d]/g, '');
  const isNetwork = !value.match(/\d/);

  return (
    <div
      className="bg-primary px-4 py-6 text-center hover:bg-primary-dark transition-colors duration-200"
      style={{ animation: started ? `fadeInUp 0.6s ease ${delay}s both` : 'none' }}
    >
      <div className="text-2xl md:text-3xl font-black text-white mb-1.5">
        {isNetwork ? (
          <span className="text-base md:text-lg">{value}</span>
        ) : (
          <>{num}{suffix}</>
        )}
      </div>
      <div className="text-red-100 font-medium uppercase tracking-wide text-xs">{label}</div>
    </div>
  );
}

export default function Stats() {
  const { t } = useLanguage();
  const s = t.stats;
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const stats = [
    { value: s.s1v, label: s.s1l },
    { value: s.s2v, label: s.s2l },
    { value: s.s3v, label: s.s3l },
    { value: s.s4v, label: s.s4l },
  ];

  return (
    <section className="bg-primary py-6" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-red-800">
          {stats.map((stat, i) => (
            <StatCard key={stat.label + i} value={stat.value} label={stat.label} delay={i * 0.1} started={started} />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
