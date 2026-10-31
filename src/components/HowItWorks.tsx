const steps = [
  {
    number: '01',
    title: 'Patient Assessment',
    description:
      'Patients complete a structured short assessment regarding their healthcare requirements and preferences.',
    label: 'Step 1: Patient Input',
    badge: 'bg-brand-royal',
    badgeText: 'text-white',
  },
  {
    number: '02',
    title: 'Requirement Analysis',
    description:
      'The MedAlign platform evaluates the information provided to clarify care requirements and clinical scope.',
    label: 'Step 2: Platform Analysis',
    badge: 'bg-brand-steel',
    badgeText: 'text-white',
  },
  {
    number: '03',
    title: 'Clinic Matching',
    description:
      'Matching considers medical speciality, services, treatment requirements, geographical suitability, and provider capabilities.',
    label: 'Step 3: Multi-Factor Match',
    badge: 'bg-brand-gradientBlue',
    badgeText: 'text-white',
  },
  {
    number: '04',
    title: 'Clinic Connection',
    description:
      'Suitable clinic options and relevant consultation opportunities are identified and presented for consideration.',
    label: 'Step 4: Opportunity Identified',
    badge: 'bg-slate-800',
    badgeText: 'text-white',
  },
  {
    number: '05',
    title: 'Consultation',
    description:
      'Patients can proceed with a selected clinic to explore or arrange an official in person or digital consultation.',
    label: 'Step 5: Patient Care Journey',
    badge: 'bg-brand-mint',
    badgeText: 'text-slate-900',
  },
]

import Reveal from './Reveal.tsx'

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-brand-lightBg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal
            as="span"
            className="block text-brand-royal font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            The Process
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            From Patient Assessment to Clinic Consultation.
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            A clear, 5-step structured process ensuring high alignment between patients and healthcare providers.
          </Reveal>
        </div>

        {/* 5 Step Timeline Process */}
        <div className="relative">
          {/* Grid of 5 steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between hover:border-brand-royal transition-all"
                delay={200 + index * 90}
              >
                <div>
                  <div
                    className={`w-10 h-10 rounded-xl ${step.badge} ${step.badgeText} font-extrabold flex items-center justify-center mb-4`}
                  >
                    {step.number}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-500 font-semibold">{step.label}</div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Clarification Notice */}
        <Reveal
          className="mt-12 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900 text-xs sm:text-sm"
          delay={560}
        >
          <i className="fa-solid fa-triangle-exclamation text-amber-600 text-base mt-0.5 shrink-0"></i>
          <p>
            <strong>Important Medical Notice:</strong> MedAlign facilitates patient discovery and clinic matching. MedAlign is not a diagnostic service and does not provide medical treatment recommendations or diagnoses. All consultations take place directly between healthcare professionals and patients.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
