import Reveal from './Reveal.tsx'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <Reveal className="lg:col-span-2 space-y-4" delay={0}>
            <a href="#home" className="flex items-center space-x-3">
              <img
                src="/favicon.svg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg"
              />
              <img
                src="/medalign-wordmark-light.png"
                alt="MedAlign"
                width={1157}
                height={96}
                className="h-6 w-auto"
              />
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MedAlign (getmedalign.com) is a patient to clinic matching platform that simplifies healthcare discovery by evaluating patient requirements and connecting them with suitable healthcare providers.
            </p>
            <p className="text-xs text-slate-500">Official contact: partnerships@getmedalign.com</p>
          </Reveal>

          {/* Col 2: Navigation */}
          <Reveal delay={80}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-white transition-colors">Benefits for Clinics</a>
              </li>
              <li>
                <a href="#onboarding" className="hover:text-white transition-colors">Clinic Onboarding</a>
              </li>
            </ul>
          </Reveal>

          {/* Col 3: Partnerships */}
          <Reveal delay={160}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Partnership</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#register" className="hover:text-white transition-colors">Partner With Us</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#register" className="hover:text-white transition-colors">Contact Support</a>
              </li>
            </ul>
          </Reveal>

          {/* Col 4: Legal */}
          <Reveal delay={240}>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal Policy</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Terms and Conditions</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Medical Disclaimer</a>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Medical Disclaimer Box */}
        <Reveal
          className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1"
          delay={320}
        >
          <p className="font-bold text-slate-300">Medical Disclaimer:</p>
          <p>
            MedAlign facilitates patient discovery and clinic matching. MedAlign is not a healthcare provider, does not offer medical advice, diagnostic evaluations, or treatment recommendations, and does not replace professional clinical decision making. All patient consultations occur directly between patients and their chosen healthcare providers.
          </p>
        </Reveal>

        {/* Bottom Copyright */}
        <Reveal className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500" delay={400}>
          <p>
            &copy; <span id="year">{year}</span> MedAlign. All rights reserved. Registered healthcare partnership platform.
          </p>
        </Reveal>
      </div>
    </footer>
  )
}
