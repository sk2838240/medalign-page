import Reveal from './Reveal.tsx'

export default function About() {
  return (
    <section id="about" className="py-20 bg-brand-lightBg border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal
              as="span"
              className="block text-brand-royal font-extrabold text-sm uppercase tracking-wider"
              delay={0}
            >
              About MedAlign
            </Reveal>
            <Reveal
              as="h2"
              className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
              delay={80}
            >
              Making Healthcare Discovery More Meaningful.
            </Reveal>
            <Reveal as="p" className="text-slate-600 leading-relaxed" delay={160}>
              MedAlign is a patient to clinic matching platform that simplifies healthcare discovery by evaluating patient requirements and connecting them with suitable healthcare providers. We eliminate vague searches and streamline the pathway between patient consultation requests and practice specialities.
            </Reveal>

            {/* 3 Values */}
            <div className="space-y-4 pt-2">
              <Reveal
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100"
                delay={240}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-royal/10 text-brand-royal flex items-center justify-center shrink-0 font-bold">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Patient Focused Discovery</h3>
                  <p className="text-sm text-slate-600 mt-1">Patients express specific care requirements, enabling accurate routing to practices equipped to help them.</p>
                </div>
              </Reveal>

              <Reveal
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100"
                delay={320}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-steel/10 text-brand-steel flex items-center justify-center shrink-0 font-bold">
                  <i className="fa-solid fa-diagram-project"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Relevant Clinic Matching</h3>
                  <p className="text-sm text-slate-600 mt-1">Our system evaluates medical specialities, geographic preferences, and provider scope to ensure mutual suitability.</p>
                </div>
              </Reveal>

              <Reveal
                className="flex items-start space-x-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100"
                delay={400}
              >
                <div className="w-10 h-10 rounded-lg bg-brand-mint/30 text-slate-900 flex items-center justify-center shrink-0 font-bold">
                  <i className="fa-solid fa-handshake"></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Meaningful Consultation Opportunities</h3>
                  <p className="text-sm text-slate-600 mt-1">Clinics receive actionable consultation interest from patients whose clinical needs match their core strengths.</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Graphic Column */}
          <div className="lg:col-span-6">
            <Reveal
              className="relative bg-white p-8 rounded-3xl custom-shadow border border-slate-100"
              direction="right"
              delay={120}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4 pb-4 border-b border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-brand-royal flex items-center justify-center text-white text-xl">
                    <i className="fa-solid fa-network-wired"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900">The MedAlign Platform Engine</h4>
                    <p className="text-xs text-slate-500">Bridging discovery between care seekers and care providers</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold">Discovery Logic</p>
                    <p className="text-sm font-bold text-slate-800 mt-1">Structured Intake Assessment</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold">Filtering Criteria</p>
                    <p className="text-sm font-bold text-slate-800 mt-1">Speciality & Capabilities</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold">Provider Model</p>
                    <p className="text-sm font-bold text-slate-800 mt-1">Qualified Consultations</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-xs text-slate-500 font-semibold">Patient Cost</p>
                    <p className="text-sm font-bold text-slate-800 mt-1">100% Free Platform</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl gradient-bg text-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold opacity-90">
                    <span>Goal Alignment</span>
                    <span>High Quality Discovery</span>
                  </div>
                  <p className="text-sm font-medium">
                    "Connecting patients directly with doctors and clinics designed to address their specific requirements."
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
