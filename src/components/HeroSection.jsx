import { motion, useScroll, useTransform } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useRef } from "react"
import { fadeUp, scaleIn } from "../variants"
import { isLoggedIn, getUser } from "../utils/auth"
import "./HeroSection.css"

const STATS = [
    { value: "10k+", label: "Families supported" },
    { value: "98%", label: "Caregiver satisfaction" },
    { value: "4.9★", label: "App store rating" },
]

const ROLE_REDIRECT = {
    caregiver: "/caregiver/dashboard",
    patient: "/patient/companion",
}

const REMINDERS = [
    { icon: "💊", title: "Morning medicine", time: "9:00 AM", status: "pending", bg: "#FDE8D8" },
    { icon: "🍳", title: "Breakfast", time: "Done", status: "done", bg: "#FEF3DC" },
    { icon: "🧠", title: "Memory exercise", time: "11:00 AM", status: "pending", bg: "#EDE8FD" },
]

export default function HeroSection() {
    const navigate = useNavigate()
    const loggedIn = isLoggedIn()
    const user = getUser()
    const dashPath = ROLE_REDIRECT[user?.role] || "/caregiver/dashboard"
    const sectionRef = useRef(null)

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
    const phoneY = useTransform(scrollYProgress, [0, 1], [0, 40])
    const textY = useTransform(scrollYProgress, [0, 1], [0, -20])

    return (
        <section className="hs-section" id="hero" ref={sectionRef}>

            {/* Background orbs */}
            <div className="hs-orb hs-orb-1" />
            <div className="hs-orb hs-orb-2" />
            <div className="hs-orb hs-orb-3" />

            <div className="hs-container">

                {/* ── Left text ── */}
                <motion.div className="hs-text" style={{ y: textY }}>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="hs-badge"
                    >
                        <span className="hs-badge-dot" />
                        🧠 AI-Powered Memory Care
                    </motion.div>

                    <motion.h1
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="hs-heading"
                    >
                        A companion that
                        <span className="hs-accent"> remembers</span>
                        <br />with your loved one.
                    </motion.h1>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="hs-sub"
                    >
                        SmritiCare helps people with memory challenges stay safe, follow daily routines,
                        and feel emotionally supported — while giving caregivers real-time peace of mind.
                    </motion.p>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="hs-cta-row"
                    >
                        {loggedIn ? (
                            <>
                                <motion.button
                                    whileHover={{ y: -3, boxShadow: "0 12px 32px #8B5E3C44" }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate(dashPath)}
                                    className="hs-btn-primary"
                                >
                                    <span>Go to Dashboard</span>
                                    <span className="hs-btn-icon">→</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                                    className="hs-btn-secondary"
                                >
                                    ▶ See how it works
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ y: -3, boxShadow: "0 12px 32px #8B5E3C44" }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/register")}
                                    className="hs-btn-primary"
                                >
                                    <span>Start free trial</span>
                                    <span className="hs-btn-icon">→</span>
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                                    className="hs-btn-secondary"
                                >
                                    ▶ See how it works
                                </motion.button>
                            </>
                        )}
                    </motion.div>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="hs-hint"
                    >
                        {loggedIn
                            ? `Welcome back, ${user?.name || "there"} 👋`
                            : "No credit card required · Free 14-day trial"}
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}
                        className="hs-stats"
                    >
                        {STATS.map((s, i) => (
                            <div key={i} className="hs-stat">
                                <span className="hs-stat-value">{s.value}</span>
                                <span className="hs-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* ── Right phone ── */}
                <motion.div
                    variants={scaleIn} initial="hidden" animate="visible" custom={2}
                    className="hs-visual"
                    style={{ y: phoneY }}
                >
                    {/* Glow */}
                    <div className="hs-glow" />

                    {/* Phone card */}
                    <div className="hs-phone">

                        {/* Phone top bar */}
                        <div className="hs-phone-bar">
                            <div className="hs-phone-bar-dots">
                                <span /><span /><span />
                            </div>
                            <span className="hs-phone-bar-title">SmritiCare · Today</span>
                            <div className="hs-phone-status">
                                <span className="hs-status-dot" />
                                Live
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className="hs-phone-avatar-wrap">
                            <motion.div
                                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.1, 0.35] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="hs-phone-ring"
                            />
                            <motion.div
                                animate={{ scale: [1, 1.14, 1], opacity: [0.2, 0.05, 0.2] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                                className="hs-phone-ring hs-phone-ring-2"
                            />
                            <div className="hs-phone-face">🧓</div>
                        </div>

                        <p className="hs-phone-msg">
                            You have 3 reminders today. Your medicine is due in <strong>18 minutes.</strong>
                        </p>

                        {/* Reminder cards */}
                        <div className="hs-reminders">
                            {REMINDERS.map((r, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, x: 16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                                    className="hs-reminder-card"
                                >
                                    <div className="hs-reminder-icon" style={{ background: r.bg }}>
                                        {r.icon}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p className="hs-reminder-title">{r.title}</p>
                                        <p className="hs-reminder-time">{r.time}</p>
                                    </div>
                                    <span className={`hs-reminder-badge hs-badge-${r.status}`}>
                                        {r.status === "done" ? "Done" : "Pending"}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Floating chips */}
                    <motion.div
                        initial={{ opacity: 0, y: 16, x: 16 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="hs-chip hs-chip-bottom"
                    >
                        <motion.span
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="hs-chip-live"
                        />
                        Caregiver notified
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: -16, x: -16 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="hs-chip hs-chip-top"
                    >
                        😊 Mood: Calm & happy
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.6, duration: 0.4 }}
                        className="hs-chip hs-chip-left"
                    >
                        📍 Home · Safe zone
                    </motion.div>
                </motion.div>
            </div>

            {/* Wave */}
            <div className="hs-wave">
                <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 35 C360 70 1080 0 1440 35 L1440 70 L0 70 Z" fill="#F0E8DC" />
                </svg>
            </div>
        </section>
    )
}