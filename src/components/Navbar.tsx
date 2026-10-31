import { useState } from 'react'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#benefits', label: 'Benefits for Clinics' },
  { href: '#onboarding', label: 'Clinic Onboarding' },
  { href: '#faqs', label: 'FAQs' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* MedAlign Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-brand-royal flex items-center justify-center text-brand-mint font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              <i className="fa-solid fa-stetho-scope"></i>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900">
              Med<span className="text-brand-royal">Align</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-brand-royal transition-colors">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Primary CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="#register"
              className="bg-brand-royal hover:bg-opacity-95 text-white font-semibold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-royal/20 hover:shadow-lg hover:shadow-brand-royal/30"
            >
              Partner With Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              id="mobile-menu-btn"
              type="button"
              className="text-slate-600 hover:text-brand-royal focus:outline-none p-2"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`${menuOpen ? '' : 'hidden '}lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-xl`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={closeMenu}
            className="mobile-link block px-3 py-2 rounded-md font-medium text-slate-700 hover:bg-slate-50 hover:text-brand-royal"
          >
            {link.label}
          </a>
        ))}
        <div className="pt-2">
          <a
            href="#register"
            onClick={closeMenu}
            className="mobile-link block w-full text-center bg-brand-royal text-white font-semibold px-5 py-3 rounded-xl shadow-md"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </header>
  )
}
