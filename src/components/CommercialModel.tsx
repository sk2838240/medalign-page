import Reveal from './Reveal.tsx'

export default function CommercialModel() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Reveal
              as="span"
              className="block text-brand-steel font-extrabold text-sm uppercase tracking-wider"
              delay={0}
            >
              Commercial Alignment
            </Reveal>
            <Reveal
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              delay={80}
            >
              A Transparent Partnership Built Around Qualified Consultations.
            </Reveal>
            <Reveal as="p" className="text-slate-600 leading-relaxed" delay={160}>
              MedAlign follows a consultation based commercial model rather than charging expensive upfront fees or flat monthly listing charges. We align our partnership model with your real practice outcomes.
            </Reveal>

            <div className="space-y-4">
              <Reveal
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3"
                delay={240}
              >
                <i className="fa-solid fa-circle-check text-brand-royal text-xl mt-0.5"></i>
                <div>
                  <h3 className="font-bold text-slate-900">No Flat Monthly Listing Fee</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    You do not pay recurring listing fees simply to keep your practice visible on our network.
                  </p>
                </div>
              </Reveal>

              <Reveal
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3"
                delay={320}
              >
                <i className="fa-solid fa-circle-check text-brand-royal text-xl mt-0.5"></i>
                <div>
                  <h3 className="font-bold text-slate-900">Qualified Consultation Based Pricing</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Our commercial framework reflects verified consultation opportunities aligned with your specialities.
                  </p>
                </div>
              </Reveal>

              <Reveal
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3"
                delay={400}
              >
                <i className="fa-solid fa-circle-check text-brand-royal text-xl mt-0.5"></i>
                <div>
                  <h3 className="font-bold text-slate-900">Transparent Commercial Terms</h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Clear terms defined prior to onboarding with full visibility for your administration team.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal className="pt-4" delay={480}>
              <a
                href="#register"
                className="inline-block bg-brand-royal text-white font-bold px-8 py-4 rounded-xl shadow-md hover:bg-brand-royal/90 transition-all"
              >
                Discuss Partnership Pricing
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal
              className="bg-slate-900 text-white p-8 sm:p-10 rounded-3xl relative overflow-hidden shadow-2xl"
              direction="right"
              delay={120}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-royal/40 rounded-full filter blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="inline-block bg-brand-mint text-slate-900 text-xs font-extrabold px-3 py-1 rounded-full">
                  Free for Patients
                </div>
                <h3 className="text-2xl font-bold">Why Clinics Prefer Qualified Consultation Models</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Traditional marketing charges clinics fixed fees regardless of whether enquiries fit medical capabilities. MedAlign structures value around actual clinical relevance and matching quality.
                </p>

                <div className="border-t border-slate-800 pt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Traditional Directory</p>
                    <p className="text-sm font-bold text-rose-400 mt-1">Flat Monthly Recurring Fees</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">MedAlign Partnership</p>
                    <p className="text-sm font-bold text-brand-mint mt-1">Qualified Consultation Pricing</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
