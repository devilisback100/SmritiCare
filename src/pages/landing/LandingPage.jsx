import LandingNav from "../../components/LandingNav"
import HeroSection from "../../components/HeroSection"
import FeaturesSection from "../../components/FeaturesSection"
import HowItWorks from "../../components/HowItWorks"
import PricingSection from "../../components/PricingSection"
import ContactSection from "../../components/ContactSection"
import Footer from "../../components/Footer"

export default function LandingPage() {
    return (
        <>
            <LandingNav />
            <HeroSection />
            <FeaturesSection />
            <HowItWorks />
            <PricingSection />
            <ContactSection />
            <Footer />
        </>
    )
}