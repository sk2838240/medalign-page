import { useState, type FormEvent } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const specialityOptions = [
  { value: 'multispeciality', label: 'Multispeciality Hospital' },
  { value: 'orthopaedics', label: 'Orthopaedics & Sports Medicine' },
  { value: 'cardiology', label: 'Cardiology & Vascular' },
  { value: 'dermatology', label: 'Dermatology & Care' },
  { value: 'paediatrics', label: 'Paediatrics' },
  { value: 'general', label: 'General Practice & Internal Medicine' },
  { value: 'other', label: 'Other Specialities' },
]

const locationsCountOptions = [
  { value: '1', label: '1 Single Location' },
  { value: '2-5', label: '2 to 5 Locations' },
  { value: '6-10', label: '6 to 10 Locations' },
  { value: '10+', label: 'More than 10 Locations' },
]

export default function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false)

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)

    if (window.gtag) {
      window.gtag('event', 'generate_lead', {
        event_category: 'Clinic Registration',
        event_label: 'MedAlign Partnership Request',
      })
    }
  }

  return (
    <section id="register" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 custom-shadow-lg">
          <div className="text-center space-y-3 mb-10">
            <span className="text-brand-royal font-extrabold text-sm uppercase tracking-wider">Registration</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Let's Bring Your Clinic Closer to the Right Patients.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Complete the registration form below. Our team will review your practice information and get in touch to discuss partnership onboarding.
            </p>
          </div>

          {/* Form Element */}
          <form id="clinic-form" className={`space-y-6 ${submitted ? 'hidden' : ''}`} onSubmit={handleFormSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* 1. Clinic or Hospital Name */}
              <div>
                <label
                  htmlFor="clinic_name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Clinic or Hospital Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="clinic_name"
                  name="clinic_name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. Apex Healthcare Centre"
                />
              </div>

              {/* 2. Contact Person Name */}
              <div>
                <label
                  htmlFor="contact_name"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Contact Person Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. Dr. Sarah Jenkins"
                />
              </div>

              {/* 3. Designation */}
              <div>
                <label
                  htmlFor="designation"
                  className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
                >
                  Designation <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. Practice Director / Medical Lead"
                />
              </div>

              {/* 4. Business Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Business Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. contact@apexhealth.com"
                />
              </div>

              {/* 5. Contact Number */}
              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. +1 (555) 019-2834"
                />
              </div>

              {/* 6. Clinic Location */}
              <div>
                <label htmlFor="location" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Clinic Location (City / Region) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="e.g. Boston, MA"
                />
              </div>

              {/* 7. Medical Speciality */}
              <div>
                <label htmlFor="speciality" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Primary Medical Speciality <span className="text-rose-500">*</span>
                </label>
                <select
                  id="speciality"
                  name="speciality"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm bg-white"
                >
                  <option value="">Select Primary Speciality</option>
                  {specialityOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* 8. Website URL (optional) */}
              <div>
                <label htmlFor="website" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Website URL <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                  placeholder="https://www.apexhealth.com"
                />
              </div>
            </div>

            {/* 9. Number of Clinic Locations */}
            <div>
              <label
                htmlFor="locations_count"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Number of Clinic Locations <span className="text-rose-500">*</span>
              </label>
              <select
                id="locations_count"
                name="locations_count"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm bg-white"
              >
                {locationsCountOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 10. Additional Information (optional) */}
            <div>
              <label
                htmlFor="additional_info"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2"
              >
                Additional Information <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                id="additional_info"
                name="additional_info"
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-brand-royal focus:border-brand-royal outline-none transition-all text-sm"
                placeholder="Tell us about specific clinical services or requirements your practice prioritises..."
              ></textarea>
            </div>

            {/* Privacy Consent & Spam Protection */}
            <div className="flex items-start space-x-3 text-xs text-slate-600">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                required
                className="mt-0.5 rounded text-brand-royal focus:ring-brand-royal"
              />
              <label htmlFor="consent">
                I consent to MedAlign storing and processing my business details to evaluate our clinic partnership request in accordance with the Privacy Policy.
              </label>
            </div>

            {/* CTA Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-brand-royal hover:bg-brand-royal/95 text-white font-bold py-4 rounded-xl shadow-lg transition-all text-base"
              >
                Submit Partnership Request
              </button>
            </div>
          </form>

          {/* Form Submission Confirmation Alert Box (Hidden by default) */}
          <div
            id="form-success"
            className={`${submitted ? '' : 'hidden '}mt-6 p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3`}
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <h3 className="text-xl font-bold text-emerald-900">Partnership Request Received</h3>
            <p className="text-sm text-emerald-800">
              Thank you for registering your clinic with MedAlign. A confirmation email has been dispatched to your provided contact address. Our clinic onboarding team will reach out shortly.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
