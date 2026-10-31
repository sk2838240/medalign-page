const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-brand-royal flex items-center justify-center text-brand-mint font-bold text-lg">
                <i className="fa-solid fa-stetho-scope"></i>
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Med<span className="text-brand-steel">Align</span>
              </span>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MedAlign (getmedalign.com) is a patient to clinic matching platform that simplifies healthcare discovery by evaluating patient requirements and connecting them with suitable healthcare providers.
            </p>
            <p className="text-xs text-slate-500">Official contact: partnerships@getmedalign.com</p>
          </div>

          {/* Col 2: Navigation */}
          <div>
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
          </div>

          {/* Col 3: Partnerships */}
          <div>
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
          </div>

          {/* Col 4: Legal */}
          <div>
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
          </div>
        </div>

        {/* Medical Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <p className="font-bold text-slate-300">Medical Disclaimer:</p>
          <p>
            MedAlign facilitates patient discovery and clinic matching. MedAlign is not a healthcare provider, does not offer medical advice, diagnostic evaluations, or treatment recommendations, and does not replace professional clinical decision making. All patient consultations occur directly between patients and their chosen healthcare providers.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>
            &copy; <span id="year">{year}</span> MedAlign. All rights reserved. Registered healthcare partnership platform.
          </p>
        </div>
      </div>
    </footer>
  )
}
