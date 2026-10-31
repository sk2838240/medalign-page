const onboardingSteps = [
  {
    number: '1',
    badge: 'bg-brand-royal',
    badgeText: 'text-white',
    title: 'Submit Your Details',
    description:
      'Complete the clinic registration form below with basic information regarding your practice and medical specialities.',
  },
  {
    number: '2',
    badge: 'bg-brand-steel',
    badgeText: 'text-white',
    title: 'Initial Discussion',
    description:
      'Our partnership team conducts a review to understand your clinic scope, capabilities, and consultation priorities.',
  },
  {
    number: '3',
    badge: 'bg-brand-gradientBlue',
    badgeText: 'text-white',
    title: 'Clinic Verification',
    description:
      'Submitted clinic credentials and provider details are reviewed to maintain network quality and patient trust.',
  },
  {
    number: '4',
    badge: 'bg-slate-800',
    badgeText: 'text-white',
    title: 'Profile Setup',
    description:
      'Your approved clinic profile is established in the MedAlign matching engine with your specific services mapped.',
  },
  {
    number: '5',
    badge: 'bg-brand-mint',
    badgeText: 'text-slate-900',
    title: 'Start Receiving Opportunities',
    description:
      'Your clinic can begin receiving relevant consultation opportunities based on patient matching criteria and location availability.',
  },
]

import Reveal from './Reveal.tsx'

export default function Onboarding() {
  return (
    <section id="onboarding" className="py-20 bg-brand-lightBg border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal
            as="span"
            className="block text-brand-royal font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            Simple Steps
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            Get Your Clinic Onboarded in Five Simple Steps.
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            Our onboarding team guides your practice through verification to live opportunities smoothly.
          </Reveal>
        </div>

        {/* Onboarding Timeline Visual */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {onboardingSteps.map((step, index) => (
            <Reveal
              key={step.number}
              className={`bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4 ${
                index === onboardingSteps.length - 1 ? 'border-l-4 border-l-brand-mint' : ''
              }`}
              delay={200 + index * 90}
            >
              <div
                className={`w-10 h-10 rounded-full ${step.badge} ${step.badgeText} font-bold flex items-center justify-center shrink-0`}
              >
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 text-lg">{step.title}</h3>
                <p className="text-sm text-slate-600 mt-1">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12" delay={620}>
          <a
            href="#register"
            className="inline-block bg-brand-royal hover:bg-brand-royal/95 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all"
          >
            Start Your Clinic Registration
          </a>
        </Reveal>
      </div>
    </section>
  )
}
