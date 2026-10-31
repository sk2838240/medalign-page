const benefits = [
  {
    icon: 'fa-user-check',
    iconBg: 'bg-brand-royal',
    iconText: 'text-white',
    title: 'Relevant Patient Enquiries',
    description:
      "Connect with patients whose requirements align directly with your clinic's services and medical specialities.",
  },
  {
    icon: 'fa-globe',
    iconBg: 'bg-brand-steel',
    iconText: 'text-white',
    title: 'Greater Digital Visibility',
    description:
      'Improve your clinic discoverability without having to manage complex digital marketing campaigns.',
  },
  {
    icon: 'fa-clipboard-list',
    iconBg: 'bg-brand-gradientBlue',
    iconText: 'text-white',
    title: 'Structured Patient Information',
    description:
      'Gain clear insights into patient consultation requirements before committing consultation schedules.',
  },
  {
    icon: 'fa-calendar-check',
    iconBg: 'bg-slate-800',
    iconText: 'text-white',
    title: 'Consultation Opportunities',
    description:
      'Focus administrative energy on meaningful consultation enquiries rather than untargeted phone traffic.',
  },
  {
    icon: 'fa-id-card-clip',
    iconBg: 'bg-brand-mint',
    iconText: 'text-slate-900',
    title: 'Simple Onboarding',
    description:
      'Join our healthcare network through a straightforward registration and verification process guided by our team.',
  },
  {
    icon: 'fa-chart-line',
    iconBg: 'bg-emerald-600',
    iconText: 'text-white',
    title: 'Performance Based Model',
    description:
      'Commercial pricing based on qualified consultations rather than a flat monthly listing fee.',
  },
]

import Reveal from './Reveal.tsx'

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal
            as="span"
            className="block text-brand-steel font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            Partner Value
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            More Relevant Patient Connections. Better Opportunities for Your Clinic.
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            Designed specifically to support healthcare providers in reaching patients who require their specific expertise.
          </Reveal>
        </div>

        {/* 6 Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:border-brand-royal hover:shadow-xl transition-all group"
              delay={200 + index * 80}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${benefit.iconBg} ${benefit.iconText} flex items-center justify-center text-xl mb-6 group-hover:scale-110 transition-transform`}
              >
                <i className={`fa-solid ${benefit.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
