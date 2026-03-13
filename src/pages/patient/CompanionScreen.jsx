import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Bell } from "lucide-react"
import { fadeUp, scaleIn } from "../../variants"
import { PatientSidebar } from "../../components/layout/AppSidebar"
import "./CompanionScreen.css"

const reminders = [
    { id: 1, icon: "💊", label: "Morning medicine", time: "Due at 9:00 AM", status: "pending", bg: "#FDE8D8" },
    { id: 2, icon: "🍽️", label: "Breakfast", time: "Due at 8:30 AM", status: "done", bg: "#FEF3DC" },
    { id: 3, icon: "🧠", label: "Memory exercise", time: "Due at 11:00 AM", status: "upcoming", bg: "#EAF3DE" },
]

const navItems = [
    { icon: "🏠", label: "Home", path: "/patient/companion", active: true },
    { icon: "📋", label: "Routine", path: "/patient/routine", active: false },
    { icon: "🧠", label: "Exercises", path: "/patient/exercises", active: false },
    { icon: "📖", label: "Journal", path: "/patient/journal", active: false },
]

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
}

export default function CompanionScreen() {
    const navigate = useNavigate()

    return (
        <div className="companion-page">
            <div className="grain-overlay" />
            <PatientSidebar />

            <div className="companion-body">
                <motion.header
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className="companion-header"
                >
                    <span className="companion-logo">Clara</span>
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/caregiver/alerts")}
                        className="companion-bell"
                    >
                        <Bell size={16} color="#6B4C35" />
                        <span className="companion-bell-dot" />
                    </motion.button>
                </motion.header>

                <div className="companion-scroll-area">
                    <motion.section
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="companion-avatar-section"
                    >
                        <div className="companion-avatar-wrap">
                            {[0, 1].map(i => (
                                <motion.div key={i}
                                    animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.1, 0.35] }}
                                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
                                    style={{
                                        position: "absolute",
                                        inset: i === 0 ? -8 : -16,
                                        borderRadius: "50%",
                                        border: "1.5px solid #C8874A",
                                    }}
                                />
                            ))}
                            <motion.div
                                variants={scaleIn} initial="hidden" animate="visible" custom={2}
                                className="companion-avatar-circle"
                            >
                                🧓
                                <span className="companion-status-dot" />
                            </motion.div>
                        </div>
                        <h1 className="companion-greeting">{getGreeting()}, Clara</h1>
                        <p className="companion-subgreeting">
                            {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                    </motion.section>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="companion-voice-wrap"
                    >
                        <div className="companion-voice-bubble">
                            <div className="companion-voice-icon">🎙️</div>
                            <div>
                                <p className="companion-voice-text">
                                    Good morning! You have 3 reminders today. Your medicine is due in 18 minutes.
                                </p>
                                <div className="companion-voice-bars">
                                    {[8, 14, 10, 16, 8].map((h, i) => (
                                        <motion.div key={i}
                                            animate={{ scaleY: [1, 0.4, 1] }}
                                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                                            style={{ width: 3, height: h, backgroundColor: "#C8874A", borderRadius: 99, transformOrigin: "bottom" }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="companion-section-header"
                    >
                        <span className="companion-section-title">TODAY'S REMINDERS</span>
                        <span className="companion-section-link">See all</span>
                    </motion.div>

                    <div className="companion-cards-wrap">
                        {reminders.map((r, i) => (
                            <motion.div key={r.id}
                                variants={fadeUp} initial="hidden" animate="visible" custom={5 + i}
                                whileHover={{ y: -2, boxShadow: "0 4px 16px #2E1B0E11" }}
                                whileTap={{ scale: 0.98 }}
                                className={`companion-reminder-card ${r.status === "done" ? "done" : ""}`}
                            >
                                <div className="companion-r-icon" style={{ backgroundColor: r.bg }}>
                                    {r.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="companion-r-title">{r.label}</p>
                                    <p className="companion-r-time">{r.time}</p>
                                </div>
                                <span className={`companion-badge companion-badge-${r.status}`}>
                                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <nav className="companion-bottom-nav">
                    {navItems.map(item => (
                        <motion.button key={item.label}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            className={`companion-nav-item ${item.active ? "active" : ""}`}
                        >
                            <span className="companion-nav-icon">{item.icon}</span>
                            <span className="companion-nav-label">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    )
}