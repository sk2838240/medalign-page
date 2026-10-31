const providers = [
  {
    icon: 'fa-hospital',
    iconBg: 'bg-brand-royal/10',
    iconText: 'text-brand-royal',
    title: 'Multispeciality Hospitals',
    description: 'Comprehensive acute and specialist care facilities.',
  },
  {
    icon: 'fa-user-doctor',
    iconBg: 'bg-brand-steel/10',
    iconText: 'text-brand-steel',
    title: 'Independent Clinics',
    description: 'Practitioner owned and multi doctor outpatient clinics.',
  },
  {
    icon: 'fa-heart-pulse',
    iconBg: 'bg-brand-gradientBlue/10',
    iconText: 'text-brand-gradientBlue',
    title: 'Specialist Centres',
    description: 'Dedicated specialty centers such as orthopaedics or cardiology.',
  },
  {
    icon: 'fa-microscope',
    iconBg: 'bg-brand-mint/30',
    iconText: 'text-slate-900',
    title: 'Diagnostic Facilities',
    description: 'Eligible imaging, diagnostic, and screening centres.',
  },
  {
    icon: 'fa-notes-medical',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-800',
    title: 'Other Providers',
    description: 'Qualified healthcare practitioners meeting regulatory standards.',
  },
]

import Reveal from './Reveal.tsx'

export default function Eligibility() {
  return (
    <section className="py-20 bg-brand-lightBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal
            as="span"
            className="block text-brand-royal font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            Eligible Providers
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            Is Your Healthcare Practice a Good Fit?
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            We partner with verified healthcare institutions and registered practitioners across multiple clinical disciplines.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {providers.map((provider, index) => (
            <Reveal
              key={provider.title}
              className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 hover:border-brand-steel transition-all"
              delay={200 + index * 80}
            >
              <div
                className={`w-12 h-12 mx-auto rounded-full ${provider.iconBg} ${provider.iconText} flex items-center justify-center text-xl`}
              >
                <i className={`fa-solid ${provider.icon}`}></i>
              </div>
              <h3 className="font-bold text-slate-900 text-base">{provider.title}</h3>
              <p className="text-xs text-slate-500">{provider.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
