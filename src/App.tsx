import About from './components/About.tsx'
import Benefits from './components/Benefits.tsx'
import CommercialModel from './components/CommercialModel.tsx'
import Eligibility from './components/Eligibility.tsx'
import Faqs from './components/Faqs.tsx'
import FinalCta from './components/FinalCta.tsx'
import Footer from './components/Footer.tsx'
import Hero from './components/Hero.tsx'
import HowItWorks from './components/HowItWorks.tsx'
import Navbar from './components/Navbar.tsx'
import Onboarding from './components/Onboarding.tsx'
import Problem from './components/Problem.tsx'
import RegistrationForm from './components/RegistrationForm.tsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problem />
        <HowItWorks />
        <Benefits />
        <Onboarding />
        <CommercialModel />
        <Eligibility />
        <RegistrationForm />
        <Faqs />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}
