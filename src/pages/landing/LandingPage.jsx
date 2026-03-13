import { useEffect } from "react"
import LandingNav from "./components/LandingNav"
import HeroSection from "./components/HeroSection"
import FeaturesSection from "./components/FeaturesSection"
import HowItWorks from "./components/HowItWorks"
import PricingSection from "./components/PricingSection"
import ContactSection from "./components/ContactSection"
import Footer from "./components/Footer"
import "./LandingPage.css"

export default function LandingPage() {
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className="landing-page">
            <div className="landing-grain" />
            <LandingNav />
            <main>
                <HeroSection />
                <FeaturesSection />
                <HowItWorks />
                <PricingSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    )
}