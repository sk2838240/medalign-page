import { useEffect, useRef, useState, type FormEvent } from 'react'
import { contactConfig, hasBusinessPhone, telHref, whatsappHref } from '../contactConfig.ts'

type LeadDetails = {
  name: string
  clinicName: string
  phone: string
  email: string
}

type ChatMessage = {
  id: number
  sender: 'bot' | 'user'
  text: string
}

type ChatPhase = 'collecting' | 'submitting' | 'success' | 'error'

type ChatField = {
  key: keyof LeadDetails
  prompt: string
  placeholder: string
  inputType: 'text' | 'tel' | 'email'
  inputMode: 'text' | 'tel' | 'email'
  autoComplete: string
}

const chatFields: ChatField[] = [
  {
    key: 'name',
    prompt: 'To connect you with our partnerships team, may I start with your name?',
    placeholder: 'Enter your name',
    inputType: 'text',
    inputMode: 'text',
    autoComplete: 'name',
  },
  {
    key: 'clinicName',
    prompt: 'Thank you. What is the name of your clinic?',
    placeholder: 'Enter your clinic name',
    inputType: 'text',
    inputMode: 'text',
    autoComplete: 'organization',
  },
  {
    key: 'phone',
    prompt: 'What is the best phone number to reach you on?',
    placeholder: 'Enter your phone number',
    inputType: 'tel',
    inputMode: 'tel',
    autoComplete: 'tel',
  },
  {
    key: 'email',
    prompt: 'Finally, what email address should we use for your enquiry?',
    placeholder: 'Enter your email address',
    inputType: 'email',
    inputMode: 'email',
    autoComplete: 'email',
  },
]

const initialLead: LeadDetails = {
  name: '',
  clinicName: '',
  phone: '',
  email: '',
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    sender: 'bot',
    text: "Hi! I'm the MedAlign assistant. I can help our clinic partnerships team get in touch with you.",
  },
  {
    id: 2,
    sender: 'bot',
    text: chatFields[0].prompt,
  },
]

const validateField = (field: ChatField, value: string) => {
  if (field.key === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ? ''
      : 'Please enter a valid email address.'
  }

  if (field.key === 'phone') {
    return value.replace(/\D/g, '').length >= 7
      ? ''
      : 'Please enter a valid phone number.'
  }

  return value.trim().length >= 2 ? '' : `Please enter your ${field.key === 'clinicName' ? 'clinic name' : 'name'}.`
}

export default function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0)
  const [lead, setLead] = useState<LeadDetails>(initialLead)
  const [draft, setDraft] = useState('')
  const [inputError, setInputError] = useState('')
  const [phase, setPhase] = useState<ChatPhase>('collecting')
  const [contactNotice, setContactNotice] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const messageIdRef = useRef(3)

  const currentField = chatFields[currentFieldIndex] ?? chatFields[0]

  const addMessage = (sender: ChatMessage['sender'], text: string) => {
    const id = messageIdRef.current
    messageIdRef.current += 1
    setMessages((current) => [...current, { id, sender, text }])
  }

  useEffect(() => {
    if (!isOpen || phase !== 'collecting') return

    inputRef.current?.focus()
  }, [currentFieldIndex, isOpen, phase])

  useEffect(() => {
    if (!isOpen) return

    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [isOpen, messages, phase])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!contactNotice) return

    const timeout = window.setTimeout(() => setContactNotice(''), 4000)
    return () => window.clearTimeout(timeout)
  }, [contactNotice])

  const submitLead = async (details: LeadDetails, submittedAt: Date) => {
    const enquiryDate = submittedAt.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    const enquiryTime = submittedAt.toLocaleTimeString('en-AU', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${contactConfig.leadRecipientEmail}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: details.name,
            clinic_name: details.clinicName,
            phone: details.phone,
            email: details.email,
            enquiry_date: enquiryDate,
            enquiry_time: enquiryTime,
            enquiry_datetime: submittedAt.toISOString(),
            _replyto: 'email',
            _subject: `New MedAlign website enquiry — ${details.clinicName}`,
            _template: 'table',
            _honey: '',
          }),
        },
      )

      const result = (await response.json().catch(() => null)) as {
        success?: boolean
      } | null

      if (!response.ok || result?.success === false) {
        throw new Error('FormSubmit rejected the enquiry')
      }

      setPhase('success')
      addMessage(
        'bot',
        'Thank you for sharing your details! Our team will connect with you soon.',
      )
    } catch {
      setPhase('error')
      addMessage(
        'bot',
        'I could not submit your details just now. Please check your connection and try again.',
      )
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (phase !== 'collecting') return

    const value = draft.trim()
    const validationError = validateField(currentField, value)

    if (validationError) {
      setInputError(validationError)
      return
    }

    const nextLead = { ...lead, [currentField.key]: value }
    setLead(nextLead)
    setDraft('')
    setInputError('')
    addMessage('user', value)

    if (currentFieldIndex < chatFields.length - 1) {
      const nextFieldIndex = currentFieldIndex + 1
      setCurrentFieldIndex(nextFieldIndex)
      addMessage('bot', chatFields[nextFieldIndex].prompt)
      return
    }

    const submittedAt = new Date()
    const summary = [
      'Please confirm the following details before I send them to our partnerships team:',
      `Name: ${nextLead.name}`,
      `Clinic: ${nextLead.clinicName}`,
      `Phone: ${nextLead.phone}`,
      `Email: ${nextLead.email}`,
    ].join('\n')

    addMessage('bot', summary)
    setPhase('submitting')
    await submitLead(nextLead, submittedAt)
  }

  const handleRetry = async () => {
    setPhase('submitting')
    await submitLead(lead, new Date())
  }

  const showPhoneNotice = () => {
    setContactNotice('The official phone number will be added shortly.')
  }

  const callButtonClass =
    'flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2'

  return (
    <>
      {isOpen && (
        <section
          className="fixed bottom-20 right-3 z-[80] flex h-[min(560px,calc(100vh-7rem))] w-[calc(100vw-1.5rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:bottom-24 sm:right-5"
          role="dialog"
          aria-labelledby="medalign-chat-title"
        >
          <header className="gradient-bg flex items-center justify-between px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-lg">
                <i className="fa-solid fa-robot"></i>
              </span>
              <div>
                <h2 id="medalign-chat-title" className="text-sm font-extrabold">
                  MedAlign Assistant
                </h2>
                <p className="text-[11px] text-white/80">Online · Ready to help</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close AI chat"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </header>

          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto overscroll-contain bg-slate-50 p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm sm:text-sm ${
                    message.sender === 'user'
                      ? 'rounded-br-md bg-brand-royal text-white'
                      : 'rounded-bl-md border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {phase === 'submitting' && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-600 shadow-sm">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Sending your enquiry…
                </div>
              </div>
            )}

            {phase === 'error' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleRetry}
                  className="rounded-xl bg-brand-royal px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-brand-royal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
                >
                  Retry submission
                </button>
              </div>
            )}
          </div>

          {phase === 'collecting' && (
            <form onSubmit={handleSubmit} className="border-t border-slate-200 bg-white p-3">
              <label htmlFor="chat-lead-input" className="sr-only">
                {currentField.prompt}
              </label>
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  id="chat-lead-input"
                  name={currentField.key}
                  type={currentField.inputType}
                  inputMode={currentField.inputMode}
                  autoComplete={currentField.autoComplete}
                  required
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value)
                    setInputError('')
                  }}
                  placeholder={currentField.placeholder}
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-brand-royal focus:ring-2 focus:ring-brand-royal/20"
                  aria-invalid={Boolean(inputError)}
                  aria-describedby={inputError ? 'chat-lead-error' : undefined}
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-royal text-white shadow-md transition-colors hover:bg-brand-royal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
                  aria-label="Send response"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
              {inputError && (
                <p id="chat-lead-error" className="mt-1.5 text-[11px] font-medium text-rose-600">
                  {inputError}
                </p>
              )}
              <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                By continuing, you agree to be contacted about your MedAlign enquiry.
              </p>
            </form>
          )}

          {phase === 'success' && (
            <div className="border-t border-slate-200 bg-white p-4">
              {hasBusinessPhone ? (
                <a
                  href={telHref}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-royal px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-royal/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
                >
                  <i className="fa-solid fa-phone"></i>
                  In a hurry? Call Now
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-slate-200 px-4 py-3 text-sm font-bold text-slate-500"
                  title="The official phone number will be added shortly."
                >
                  <i className="fa-solid fa-phone"></i>
                  In a hurry? Call Now
                </button>
              )}
            </div>
          )}
        </section>
      )}

      <div className="fixed bottom-4 right-3 z-[70] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-5">
        {contactNotice && (
          <div
            role="status"
            className="absolute bottom-full right-0 mb-3 w-max max-w-[240px] rounded-xl bg-slate-900 px-3 py-2 text-center text-xs font-medium text-white shadow-xl"
          >
            {contactNotice}
          </div>
        )}

        {telHref ? (
          <a
            href={telHref}
            className={callButtonClass}
            aria-label={`Call MedAlign at ${contactConfig.businessPhone}`}
          >
            <i className="fa-solid fa-phone text-brand-royal"></i>
            <span>Call</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={showPhoneNotice}
            className={callButtonClass}
            aria-label="Call MedAlign. Official phone number coming soon."
          >
            <i className="fa-solid fa-phone text-brand-royal"></i>
            <span>Call</span>
          </button>
        )}

        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className={callButtonClass}
            aria-label="Message MedAlign on WhatsApp"
          >
            <i className="fa-brands fa-whatsapp text-[#25D366]"></i>
            <span>WhatsApp</span>
          </a>
        ) : (
          <button
            type="button"
            onClick={showPhoneNotice}
            className={callButtonClass}
            aria-label="Message MedAlign on WhatsApp. Official phone number coming soon."
          >
            <i className="fa-brands fa-whatsapp text-[#25D366]"></i>
            <span>WhatsApp</span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="flex h-12 items-center gap-2 rounded-full gradient-bg px-4 text-xs font-extrabold text-white shadow-xl shadow-brand-royal/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-royal focus-visible:ring-offset-2"
          aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
          aria-expanded={isOpen}
        >
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-robot'}`}></i>
          <span>AI Chat</span>
        </button>
      </div>
    </>
  )
}
