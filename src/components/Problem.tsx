const patientChallenges = [
  'Difficulty finding suitable healthcare providers matching specific clinical needs.',
  'Overwhelmed by too many options online without clear direction or evaluation guidance.',
  'Excessive time spent researching individual clinic websites and generic directories.',
  'Uncertainty about where to begin when looking for specialist consultations.',
]

const clinicChallenges = [
  'Difficulty reaching patients actively seeking their precise medical specialities.',
  'Dealing with unrelated or unsuitable enquiries that consume administration bandwidth.',
  'Limited digital visibility in an increasingly noisy medical directory marketplace.',
  'Difficulty identifying relevant consultation opportunities before initial bookings.',
]

import Reveal from './Reveal.tsx'

export default function Problem() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal
            as="span"
            className="block text-brand-steel font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            Addressing Discovery Friction
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2"
            delay={80}
          >
            Finding the Right Clinic Should Not Be Complicated.
          </Reveal>
          <Reveal as="p" className="text-slate-600 mt-4" delay={160}>
            Healthcare discovery has historically been fragmented, causing frustration for patients and inefficiency for clinics.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Patient Challenges */}
          <Reveal className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 relative" delay={200}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                <i className="fa-solid fa-user-xmark"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Patient Challenges</h3>
            </div>
            <ul className="space-y-4 text-slate-700 text-sm sm:text-base">
              {patientChallenges.map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <i className="fa-solid fa-xmark text-rose-500 mt-1"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Clinic Challenges */}
          <Reveal className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 relative" delay={300}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                <i className="fa-solid fa-building-circle-exclamation"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Clinic Challenges</h3>
            </div>
            <ul className="space-y-4 text-slate-700 text-sm sm:text-base">
              {clinicChallenges.map((item) => (
                <li key={item} className="flex items-start space-x-3">
                  <i className="fa-solid fa-xmark text-amber-500 mt-1"></i>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Conclusion Banner */}
        <Reveal
          className="mt-12 p-8 rounded-3xl bg-brand-royal text-white text-center sm:text-left sm:flex items-center justify-between shadow-xl"
          delay={380}
        >
          <div className="space-y-2 max-w-2xl">
            <h4 className="text-xl font-bold">How MedAlign Bridges This Discovery Gap</h4>
            <p className="text-slate-200 text-sm sm:text-base">
              By introducing a structured assessment layer, MedAlign standardises patient requests and aligns them directly with healthcare providers who possess the exact scope of services required.
            </p>
          </div>
          <a
            href="#register"
            className="mt-6 sm:mt-0 inline-block bg-brand-mint text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-opacity-90 transition-all shrink-0"
          >
            Join Our Network
          </a>
        </Reveal>
      </div>
    </section>
  )
}
