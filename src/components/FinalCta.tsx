export default function FinalCta() {
  return (
    <section className="py-20 gradient-bg text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Your Clinic Could Be the Right Match for Someone Looking for Care.
          </h2>
          <p className="text-slate-100 text-base sm:text-lg leading-relaxed">
            Become part of the MedAlign network and explore a more structured approach to connecting with patients seeking the specific healthcare services you offer.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
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
          </div>
        </div>
      </div>
    </section>
  )
}
