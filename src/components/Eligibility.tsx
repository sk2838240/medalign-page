const providers = [
  {
    image: 'eligibilityHospital',
    icon: 'fa-hospital',
    iconBg: 'bg-brand-royal/10',
    iconText: 'text-brand-royal',
    title: 'Multispeciality Hospitals',
    description: 'Comprehensive acute and specialist care facilities.',
  },
  {
    image: 'eligibilityClinic',
    icon: 'fa-user-doctor',
    iconBg: 'bg-brand-steel/10',
    iconText: 'text-brand-steel',
    title: 'Independent Clinics',
    description: 'Practitioner owned and multi doctor outpatient clinics.',
  },
  {
    image: 'eligibilitySpecialist',
    icon: 'fa-heart-pulse',
    iconBg: 'bg-brand-gradientBlue/10',
    iconText: 'text-brand-gradientBlue',
    title: 'Specialist Centres',
    description: 'Dedicated specialty centers such as orthopaedics or cardiology.',
  },
  {
    image: 'eligibilityDiagnostic',
    icon: 'fa-microscope',
    iconBg: 'bg-brand-mint/30',
    iconText: 'text-slate-900',
    title: 'Diagnostic Facilities',
    description: 'Eligible imaging, diagnostic, and screening centres.',
  },
  {
    image: 'eligibilityPractitioner',
    icon: 'fa-notes-medical',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-800',
    title: 'Other Providers',
    description: 'Qualified healthcare practitioners meeting regulatory standards.',
  },
]

import Reveal from './Reveal.tsx'
import SectionImage from './SectionImage.tsx'
import { siteImages } from '../assets/images/index.ts'

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

        <div className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {providers.map((provider, index) => {
            const photo = siteImages[provider.image as keyof typeof siteImages]
            return (
              <Reveal key={provider.title} className="h-full" delay={200 + index * 80}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-center transition-all hover:border-brand-steel hover:shadow-lg">
                  <div className="relative shrink-0">
                    <SectionImage
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      className="h-44 shrink-0 sm:h-48"
                      imgClassName="h-full w-full object-cover"
                    />
                    <span
                      className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-xl shadow-sm ${provider.iconBg} ${provider.iconText}`}
                    >
                      <i className={`fa-solid ${provider.icon}`}></i>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-10">
                    <h3 className="text-base font-bold leading-6 text-slate-900 xl:min-h-[3rem]">
                      {provider.title}
                    </h3>
                    <p className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500 xl:min-h-[3.75rem]">
                      {provider.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
