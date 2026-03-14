import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { isLoggedIn, getUser, logout } from "../utils/auth"
import "./LandingNav.css"

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
]

const ROLE_REDIRECT = {
    caregiver: "/caregiver/dashboard",
    patient: "/patient/companion",
}

export default function LandingNav() {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)
    const loggedIn = isLoggedIn()
    const user = getUser()
    const dashPath = ROLE_REDIRECT[user?.role] || "/caregiver/dashboard"

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", fn)
        return () => window.removeEventListener("scroll", fn)
    }, [])

    useEffect(() => {
        const fn = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", fn)
        return () => document.removeEventListener("mousedown", fn)
    }, [])

    const scrollTo = (href) => {
        setOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }

    const initials = user?.name
        ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : "U"

    return (
        <>
            <motion.nav
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`ln-nav ${scrolled ? "ln-scrolled" : ""}`}
            >
                <div className="ln-inner">

                    {/* Logo */}
                    <button onClick={() => navigate("/")} className="ln-logo">
                        <div className="ln-logo-mark">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="#FAF4ED" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        <span className="ln-logo-text">SmritiCare</span>
                    </button>

                    {/* Desktop links */}
                    <div className="ln-links">
                        {links.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)} className="ln-link">
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="ln-cta">
                        {loggedIn ? (
                            <div className="ln-profile-wrap" ref={profileRef}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setProfileOpen(p => !p)}
                                    className="ln-profile-btn"
                                >
                                    <div className="ln-avatar">{initials}</div>
                                    <span className="ln-profile-name">{user?.name || "Profile"}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </motion.button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                            transition={{ duration: 0.15 }}
                                            className="ln-dropdown"
                                        >
                                            <div className="ln-dropdown-header">
                                                <p className="ln-dropdown-name">{user?.name}</p>
                                                <p className="ln-dropdown-email">{user?.email}</p>
                                                <span className="ln-dropdown-role">{user?.role || "user"}</span>
                                            </div>
                                            <div className="ln-dropdown-divider" />
                                            <button
                                                onClick={() => { setProfileOpen(false); navigate(dashPath) }}
                                                className="ln-dropdown-item"
                                            >
                                                <span>📊</span> Dashboard
                                            </button>
                                            <div className="ln-dropdown-divider" />
                                            <button
                                                onClick={() => { setProfileOpen(false); logout() }}
                                                className="ln-dropdown-item ln-dropdown-logout"
                                            >
                                                <span>🚪</span> Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/login")}
                                    className="ln-signin"
                                >
                                    Sign in
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -1, boxShadow: "0 4px 16px #5C3D2240" }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/register")}
                                    className="ln-getstarted"
                                >
                                    Get started
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setOpen(o => !o)} className="ln-hamburger" aria-label="Menu">
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="ln-backdrop"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="ln-mobile-drawer"
                        >
                            <div className="ln-mobile-header">
                                <div className="ln-logo-mark" style={{ width: 32, height: 32 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="#FAF4ED" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                        <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                </div>
                                <span className="ln-logo-text">SmritiCare</span>
                                <button onClick={() => setOpen(false)} className="ln-close-btn">✕</button>
                            </div>

                            {loggedIn && (
                                <div className="ln-mobile-profile">
                                    <div className="ln-avatar ln-avatar-lg">{initials}</div>
                                    <div>
                                        <p className="ln-mobile-profile-name">{user?.name}</p>
                                        <p className="ln-mobile-profile-email">{user?.email}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="ln-mobile-links">
                                {links.map((l, i) => (
                                    <motion.button
                                        key={l.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => scrollTo(l.href)}
                                        className="ln-mobile-link"
                                    >
                                        {l.label}
                                        <span className="ln-mobile-arrow">→</span>
                                    </motion.button>
                                ))}
                            </nav>

                            <div className="ln-mobile-divider" />

                            <div className="ln-mobile-actions">
                                {loggedIn ? (
                                    <>
                                        <button
                                            onClick={() => { setOpen(false); navigate(dashPath) }}
                                            className="ln-mobile-primary"
                                        >
                                            📊 Go to Dashboard
                                        </button>
                                        <button
                                            onClick={() => { setOpen(false); logout() }}
                                            className="ln-mobile-secondary"
                                        >
                                            🚪 Sign out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => { setOpen(false); navigate("/register") }}
                                            className="ln-mobile-primary"
                                        >
                                            Get started free
                                        </button>
                                        <button
                                            onClick={() => { setOpen(false); navigate("/login") }}
                                            className="ln-mobile-secondary"
                                        >
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}