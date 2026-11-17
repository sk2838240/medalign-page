import { useRef, useState } from 'react'
import Reveal from './Reveal.tsx'
import SectionImage from './SectionImage.tsx'
import { siteImages } from '../assets/images/index.ts'

const VIDEO_SRC = '/videos/Medalign%20Reel-1.mp4'

const highlights = [
  {
    icon: 'fa-user-check',
    title: 'Patient Intake',
    description: 'Structured requirements captured up front, before a clinic is ever contacted.',
  },
  {
    icon: 'fa-diagram-project',
    title: 'Matching Logic',
    description: 'Treatment focus, geography and scope evaluated before an opportunity is shared.',
  },
  {
    icon: 'fa-handshake',
    title: 'Clinic Handover',
    description: 'Only relevant consultations reach your team, already qualified for review.',
  },
]

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    const video = videoRef.current
    if (!video) return

    void video.play().catch(() => setIsPlaying(false))
  }

  return (
    <section id="video" className="relative bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 gradient-bg opacity-15 pointer-events-none"></div>
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[38rem] h-[38rem] bg-brand-royal/30 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Reveal
            as="span"
            className="block text-brand-mint font-extrabold text-sm uppercase tracking-wider"
            delay={0}
          >
            Watch the Overview
          </Reveal>
          <Reveal
            as="h2"
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-2"
            delay={80}
          >
            See the MedAlign Matching Process in Action.
          </Reveal>
          <Reveal as="p" className="text-slate-300 mt-4" delay={160}>
            A short walkthrough of how a patient request is assessed, matched and handed to the
            right clinic.
          </Reveal>
        </div>
      </div>

      <Reveal className="relative w-full" direction="scale" delay={200}>
        <div className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/40">
          {videoError ? (
            <>
              <SectionImage
                src={siteImages.videoPoster.src}
                alt={siteImages.videoPoster.alt}
                width={siteImages.videoPoster.width}
                height={siteImages.videoPoster.height}
                className="absolute inset-0 h-full w-full"
                imgClassName="h-full w-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 space-y-3">
                <span className="inline-flex items-center gap-2 bg-brand-mint text-slate-900 text-xs font-extrabold px-4 py-2 rounded-full">
                  <i className="fa-solid fa-film"></i>
                  Platform Walkthrough
                </span>
                <p className="text-white text-lg sm:text-xl font-bold">Video unavailable</p>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md">
                  Our product walkthrough could not be loaded. Leave your clinic details below and we
                  will share it directly.
                </p>
                <a
                  href="#register"
                  className="mt-2 inline-block bg-white text-brand-royal font-bold px-6 py-3 rounded-xl transition-all hover:bg-slate-100"
                >
                  Request the Walkthrough
                </a>
              </div>
            </>
          ) : (
            <>
              <video
                ref={videoRef}
                className="h-full w-full object-contain"
                poster={siteImages.videoPoster.src}
                controls
                playsInline
                preload="metadata"
                aria-label="MedAlign platform walkthrough video"
                onPlay={() => setIsPlaying(true)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setVideoError(true)
                  setIsPlaying(false)
                }}
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlay}
                  aria-label="Play the MedAlign overview video"
                  className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand-mint text-brand-royal shadow-2xl shadow-brand-royal/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/80"
                >
                  <i className="fa-solid fa-play ml-1 text-2xl"></i>
                </button>
              )}
            </>
          )}
        </div>
      </Reveal>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              className="flex items-start space-x-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm"
              delay={280 + index * 90}
            >
              <div className="w-10 h-10 rounded-xl bg-brand-mint text-slate-900 flex items-center justify-center shrink-0">
                <i className={`fa-solid ${highlight.icon}`}></i>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">{highlight.title}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">{highlight.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
