const clinics = [
  {
    image: 'eligibilityClinic',
    icon: 'fa-spa',
    iconBg: 'bg-brand-royal/10',
    iconText: 'text-brand-royal',
    title: 'Med Spas',
    description: 'Aesthetic, wellness, and preventive treatment clinics.',
  },
  {
    image: 'eligibilityPractitioner',
    icon: 'fa-user-doctor',
    iconBg: 'bg-brand-steel/10',
    iconText: 'text-brand-steel',
    title: 'Cosmetic Clinics',
    description: 'Surgical and non-surgical cosmetic clinics.',
  },
  {
    image: 'eligibilitySpecialist',
    icon: 'fa-syringe',
    iconBg: 'bg-brand-gradientBlue/10',
    iconText: 'text-brand-gradientBlue',
    title: 'Hormone Clinics',
    description: 'Personalised hormone and wellness programs.',
  },
  {
    image: 'heroClinic',
    icon: 'fa-flask',
    iconBg: 'bg-brand-mint/30',
    iconText: 'text-slate-900',
    title: 'Peptide Clinics',
    description: 'Peptide-based wellness and performance treatments.',
  },
  {
    image: 'commercialModel',
    icon: 'fa-face-smile',
    iconBg: 'bg-slate-100',
    iconText: 'text-slate-800',
    title: 'Beauty & Body Contouring',
    description: 'Advanced beauty, skin, and body sculpting services.',
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
            Eligible Clinics
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            Is Your Speciality Clinic a Good Fit?
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            We partner with verified med spas and cosmetic clinics focused on hormone care, peptides, beauty treatments, and body contouring.
          </Reveal>
        </div>

        <div className="grid auto-rows-fr items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {clinics.map((clinic, index) => {
            const photo = siteImages[clinic.image as keyof typeof siteImages]
            return (
              <Reveal key={clinic.title} className="h-full" delay={200 + index * 80}>
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
                      className={`absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-xl shadow-sm ${clinic.iconBg} ${clinic.iconText}`}
                    >
                      <i className={`fa-solid ${clinic.icon}`}></i>
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col px-6 pb-6 pt-10">
                    <h3 className="text-base font-bold leading-6 text-slate-900 xl:min-h-[3rem]">
                      {clinic.title}
                    </h3>
                    <p className="mt-2 min-h-[2.5rem] text-xs leading-relaxed text-slate-500 xl:min-h-[3.75rem]">
                      {clinic.description}
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
