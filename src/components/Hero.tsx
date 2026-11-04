import Reveal from './Reveal.tsx'
import SectionImage from './SectionImage.tsx'
import { siteImages } from '../assets/images/index.ts'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <Reveal
              className="inline-flex items-center space-x-2 bg-brand-mint/20 border border-brand-mint/40 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800"
              delay={40}
            >
              <span className="w-2 h-2 rounded-full bg-brand-royal animate-pulse"></span>
              <span>Structured Patient Matching • Free for Patients</span>
            </Reveal>
            <Reveal
              as="h1"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
              delay={120}
            >
              Connect With Patients Who Are Looking for the <span className="gradient-text">Care You Provide</span>.
            </Reveal>
            <Reveal
              as="p"
              className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl"
              delay={200}
            >
              MedAlign helps patients discover suitable healthcare providers through a structured matching process. Partner with us to connect with patients seeking consultations that align with your clinic's specialities and services.
            </Reveal>
            <Reveal
              className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
              delay={280}
            >
              <a
                href="#register"
                className="bg-brand-royal hover:bg-brand-royal/95 text-white text-center font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-royal/25 hover:shadow-xl transition-all"
              >
                Register Your Clinic
              </a>
              <a
                href="#how-it-works"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-center font-bold px-8 py-4 rounded-xl transition-all border border-slate-200"
              >
                Explore How It Works
              </a>
            </Reveal>
            <Reveal
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 text-slate-600 text-xs sm:text-sm font-medium"
              delay={360}
            >
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-circle-check text-brand-steel"></i>
                <span>No Flat Monthly Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-circle-check text-brand-steel"></i>
                <span>Verified Requests</span>
              </div>
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-circle-check text-brand-steel"></i>
                <span>Transparent Terms</span>
              </div>
            </Reveal>
          </div>

          {/* Right Column Graphic Visual */}
          <div className="lg:col-span-5">
            <Reveal
              className="relative mx-auto max-w-md lg:max-w-none pb-12 sm:pb-14"
              direction="scale"
              delay={220}
            >
              {/* Decorative Backdrop Blob */}
              <div className="absolute -top-6 -right-6 w-72 h-72 gradient-bg rounded-full opacity-20 filter blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-brand-mint rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>

              {/* Clinic Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-100 custom-shadow-lg bg-slate-100">
                <SectionImage
                  src={siteImages.heroClinic.src}
                  alt={siteImages.heroClinic.alt}
                  width={siteImages.heroClinic.width}
                  height={siteImages.heroClinic.height}
                  priority
                  className="aspect-[4/5]"
                  imgClassName="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-brand-royal/70 to-transparent"></div>
                <div className="absolute left-4 bottom-4 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-brand-mint text-slate-900 text-[11px] font-extrabold px-3 py-1.5 rounded-full shadow-md">
                    <i className="fa-solid fa-circle-check text-xs"></i>
                    92% Speciality Alignment
                  </span>
                </div>
              </div>

              {/* Floating Match Card */}
              <div className="absolute left-0 sm:-left-4 lg:-left-10 bottom-4 sm:bottom-6 w-[85%] sm:w-[78%] rounded-2xl bg-white border border-slate-100 shadow-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-center">
                    <div className="w-9 h-9 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-steel text-sm shadow-sm">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <p className="text-[10px] font-bold mt-1.5 text-slate-700">Patient Need</p>
                  </div>
                  <div className="flex-1 px-2 text-center">
                    <div className="h-0.5 bg-slate-200 relative">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-mint text-slate-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full border border-slate-200 whitespace-nowrap">
                        Smart Match
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-9 h-9 mx-auto rounded-full gradient-bg flex items-center justify-center text-white text-sm shadow-md">
                      <i className="fa-solid fa-hospital-user"></i>
                    </div>
                    <p className="text-[10px] font-bold mt-1.5 text-slate-700">Your Clinic</p>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
                    <span>Consultation Speciality:</span>
                    <span className="text-brand-royal font-bold">Orthopaedics & Care</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-steel h-full w-[92%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Trust Line */}
            <Reveal className="mt-1 max-w-sm" delay={340}>
              <p className="text-xs text-slate-600 font-medium flex items-start gap-2">
                <i className="fa-solid fa-shield-halved text-brand-royal text-sm mt-0.5"></i>
                <span>
                  Structured data verification ensures meaningful consultation enquiries for your
                  medical team.
                </span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
