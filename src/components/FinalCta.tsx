import Reveal from './Reveal.tsx'
import SectionImage from './SectionImage.tsx'
import { siteImages } from '../assets/images/index.ts'

export default function FinalCta() {
  return (
    <section className="py-20 relative overflow-hidden bg-brand-royal">
      <SectionImage
        src={siteImages.finalCtaBg.src}
        alt={siteImages.finalCtaBg.alt}
        width={siteImages.finalCtaBg.width}
        height={siteImages.finalCtaBg.height}
        decorative
        className="absolute inset-0 h-full w-full"
        imgClassName="h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 gradient-bg opacity-70"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
            delay={0}
          >
            Your Clinic Could Be the Right Match for Someone Looking for Care.
          </Reveal>
          <Reveal as="p" className="text-slate-100 text-base sm:text-lg leading-relaxed" delay={120}>
            Become part of the MedAlign network and explore a more structured approach to connecting with patients seeking the specific healthcare services you offer.
          </Reveal>
          <Reveal
            className="pt-4 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
            delay={240}
          >
            <a
              href="#register"
              className="bg-white text-brand-royal font-extrabold px-8 py-4 rounded-xl shadow-lg hover:bg-slate-100 transition-all text-center"
            >
              Partner With MedAlign
            </a>
            <a
              href="#register"
              className="bg-brand-royal/40 hover:bg-brand-royal/60 border border-white/30 text-white font-bold px-8 py-4 rounded-xl transition-all text-center"
            >
              Contact Our Team
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
