import { useState } from 'react'

const faqs = [
  {
    question: '1. What is MedAlign?',
    answer:
      'MedAlign is a patient to clinic matching platform designed to help patients discover suitable healthcare providers based on their specific clinical requirements and treatment needs.',
  },
  {
    question: '2. How does MedAlign connect patients with clinics?',
    answer:
      'MedAlign uses a structured assessment process where patients input their health needs, location preferences, and requested services. Our platform matching engine then aligns these requirements with appropriate partner clinics.',
  },
  {
    question: '3. Which healthcare providers can register?',
    answer:
      'Multispeciality hospitals, independent clinics, specialist medical centres, and verified healthcare facilities across recognized disciplines are eligible to join the network following our verification process.',
  },
  {
    question: '4. Is there a fee to register?',
    answer: 'Submitting your clinic registration request and undergoing verification is free of charge.',
  },
  {
    question: '5. How does qualified consultation pricing work?',
    answer:
      'Instead of charging a flat monthly listing fee, MedAlign commercial pricing is aligned around qualified consultation opportunities matching your practice specialities.',
  },
  {
    question: '6. How are clinics matched with patients?',
    answer:
      'Matching evaluates patient assessment inputs against partner clinic medical specialities, geographical locations, treatment scope, and clinic consultation capabilities.',
  },
  {
    question: '7. What patient information is shared?',
    answer:
      'Clinics receive structured consultation requests containing patient care criteria, contact details, and assessment inputs necessary to coordinate relevant consultations securely.',
  },
  {
    question: '8. How does clinic onboarding work?',
    answer:
      'After submitting your registration form, our team conducts an initial discussion, verifies healthcare credentials, sets up your practice profile, and activates opportunity matching.',
  },
  {
    question: '9. Can clinics update their profiles?',
    answer:
      'Yes, clinics can update their operational details, provider lists, specialities, and service availability at any time by contacting our support team.',
  },
  {
    question: '10. Does registration guarantee consultations?',
    answer:
      'Consultation volume depends on patient search demand in your region and speciality alignment. MedAlign does not guarantee arbitrary consultation volumes, focusing instead on matching quality.',
  },
]

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section id="faqs" className="py-20 bg-brand-lightBg border-t border-slate-200/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-royal font-extrabold text-sm uppercase tracking-wider">Got Questions?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 mt-4">
            Clear information regarding MedAlign practice partnerships and clinic operations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={faq.question} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  className="faq-btn w-full px-6 py-4 text-left font-bold text-slate-900 flex justify-between items-center hover:text-brand-royal transition-colors"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <i
                    className={`fa-solid fa-chevron-down text-sm text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  ></i>
                </button>
                <div
                  className={`faq-content ${isOpen ? '' : 'hidden '}px-6 pb-4 text-sm text-slate-600 leading-relaxed`}
                >
                  {faq.answer}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
