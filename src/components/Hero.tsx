export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-slate-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-brand-mint/20 border border-brand-mint/40 rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-800">
              <span className="w-2 h-2 rounded-full bg-brand-royal animate-pulse"></span>
              <span>Structured Patient Matching • Free for Patients</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Connect With Patients Who Are Looking for the <span className="gradient-text">Care You Provide</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              MedAlign helps patients discover suitable healthcare providers through a structured matching process. Partner with us to connect with patients seeking consultations that align with your clinic's specialities and services.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
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
            </div>
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 text-slate-600 text-xs sm:text-sm font-medium">
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
            </div>
          </div>

          {/* Right Column Graphic Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Backdrop Blob */}
              <div className="absolute -top-6 -right-6 w-72 h-72 gradient-bg rounded-full opacity-20 filter blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-brand-mint rounded-full opacity-30 filter blur-3xl pointer-events-none"></div>

              {/* Card UI Visual Simulation */}
              <div className="relative bg-white rounded-3xl p-6 sm:p-8 custom-shadow-lg border border-slate-100 space-y-6">
                {/* Flow Diagram Graphic */}
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-brand-steel text-lg shadow-sm">
                      <i className="fa-solid fa-user"></i>
                    </div>
                    <p className="text-xs font-bold mt-2 text-slate-700">Patient Need</p>
                  </div>
                  <div className="flex-1 px-3 text-center">
                    <div className="h-0.5 bg-slate-200 relative">
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-brand-mint text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-slate-200">
                        Smart Match
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto rounded-full gradient-bg flex items-center justify-center text-white text-lg shadow-md">
                      <i className="fa-solid fa-hospital-user"></i>
                    </div>
                    <p className="text-xs font-bold mt-2 text-slate-700">Your Clinic</p>
                  </div>
                </div>

                {/* Mock Match Card Preview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Requirement Assessment</span>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">High Speciality Alignment</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                      <span>Consultation Speciality:</span>
                      <span className="text-brand-royal font-bold">Orthopaedics & Care</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-slate-500">
                      <span>Matching Parameters:</span>
                      <span>Geographic + Capability</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-brand-steel h-full w-[92%] rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Trust Badge */}
                <div className="flex items-center space-x-3 p-3 rounded-xl bg-brand-mint/10 border border-brand-mint/30">
                  <i className="fa-solid fa-shield-halved text-slate-800 text-lg"></i>
                  <p className="text-xs text-slate-700 font-medium">
                    Structured data verification ensures meaningful consultation enquiries for your medical team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
