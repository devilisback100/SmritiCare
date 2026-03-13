import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "./LandingNav.css"

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
]

export default function LandingNav() {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", fn)
        return () => window.removeEventListener("scroll", fn)
    }, [])

    const scrollTo = (href) => {
        setOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`landing-nav ${scrolled ? "scrolled" : ""}`}
            >
                <div className="landing-nav-inner">
                    {/* Logo */}
                    <button onClick={() => navigate("/")} className="landing-nav-logo">
                        <div className="landing-nav-logo-dot">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        <span className="landing-nav-logo-text">Clara</span>
                    </button>

                    {/* Desktop links */}
                    <div className="landing-nav-links">
                        {links.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)} className="landing-nav-link">
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="landing-nav-cta">
                        <motion.button
                            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate("/login")}
                            className="landing-nav-signin"
                        >
                            Sign in
                        </motion.button>
                        <motion.button
                            whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                            onClick={() => navigate("/login")}
                            className="landing-nav-getstarted"
                        >
                            Get started
                        </motion.button>
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setOpen(!open)} className="landing-nav-hamburger">
                        <span className={`ham-line ${open ? "open" : ""}`} />
                        <span className={`ham-line ${open ? "open" : ""}`} />
                        <span className={`ham-line ${open ? "open" : ""}`} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="landing-mobile-menu"
                    >
                        {links.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)} className="landing-mobile-link">
                                {l.label}
                            </button>
                        ))}
                        <div className="landing-mobile-divider" />
                        <button onClick={() => { setOpen(false); navigate("/login") }} className="landing-mobile-signin">
                            Sign in
                        </button>
                        <button onClick={() => { setOpen(false); navigate("/login") }} className="landing-mobile-getstarted">
                            Get started free
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}