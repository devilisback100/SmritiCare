import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../../variants"
import "./HeroSection.css"

const STATS = [
    { value: "10k+", label: "Families supported" },
    { value: "98%", label: "Caregiver satisfaction" },
    { value: "4.9★", label: "App store rating" },
]

export default function HeroSection() {
    const navigate = useNavigate()

    return (
        <section className="hero-section" id="hero">
            <div className="section-container hero-container">

                {/* Left — text */}
                <div className="hero-text">
                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="section-label"
                    >
                        🧠 AI-Powered Memory Care
                    </motion.div>

                    <motion.h1
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="hero-heading"
                    >
                        A companion that
                        <span className="hero-heading-accent"> remembers</span>
                        <br />with your loved one.
                    </motion.h1>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="hero-subheading"
                    >
                        Clara helps people with memory challenges stay safe, follow daily routines, and feel emotionally supported — while giving caregivers real-time peace of mind.
                    </motion.p>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="hero-cta-row"
                    >
                        <motion.button
                            whileHover={{ y: -2, boxShadow: "0 8px 24px #5C3D2244" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate("/login")}
                            className="hero-btn-primary"
                        >
                            Start free trial
                            <span className="hero-btn-arrow">→</span>
                        </motion.button>
                        <motion.button
                            whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                            onClick={() => document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                            className="hero-btn-secondary"
                        >
                            ▶ See how it works
                        </motion.button>
                    </motion.div>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="hero-no-cc"
                    >
                        No credit card required · Free 14-day trial
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}
                        className="hero-stats"
                    >
                        {STATS.map((s, i) => (
                            <div key={i} className="hero-stat">
                                <span className="hero-stat-value">{s.value}</span>
                                <span className="hero-stat-label">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — app preview card */}
                <motion.div
                    variants={scaleIn} initial="hidden" animate="visible" custom={2}
                    className="hero-visual"
                >
                    {/* Glow blob */}
                    <div className="hero-glow" />

                    {/* Phone mockup */}
                    <div className="hero-phone">
                        <div className="hero-phone-header">
                            <div className="hero-phone-dot" />
                            <span className="hero-phone-title">Good morning, Clara 🌅</span>
                        </div>

                        <div className="hero-phone-avatar">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.15, 0.4] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="hero-phone-ring"
                            />
                            <div className="hero-phone-face">🧓</div>
                        </div>

                        <p className="hero-phone-greeting-text">
                            You have 3 reminders today. Your medicine is due in 18 minutes.
                        </p>

                        {/* Mini reminder cards */}
                        {[
                            { icon: "💊", title: "Morning medicine", time: "9:00 AM", status: "pending", bg: "#FDE8D8" },
                            { icon: "🍳", title: "Breakfast", time: "Done", status: "done", bg: "#FEF3DC" },
                        ].map((r, i) => (
                            <motion.div key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + i * 0.15 }}
                                className="hero-phone-card"
                            >
                                <div className="hero-phone-card-icon" style={{ backgroundColor: r.bg }}>
                                    {r.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="hero-phone-card-title">{r.title}</p>
                                    <p className="hero-phone-card-time">{r.time}</p>
                                </div>
                                <span className={`hero-phone-badge ${r.status}`}>
                                    {r.status === "done" ? "Done" : "Pending"}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Floating caregiver alert chip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: 20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                        className="hero-float-chip"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="hero-float-dot"
                        />
                        <span>Caregiver notified</span>
                    </motion.div>

                    {/* Floating mood chip */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, x: -20 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                        className="hero-float-mood"
                    >
                        😊 Mood: Calm & happy
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom wave divider */}
            <div className="hero-divider">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 30 C360 60 1080 0 1440 30 L1440 60 L0 60 Z" fill="#F0E8DC" />
                </svg>
            </div>
        </section>
    )
}