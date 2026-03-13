import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import { theme } from "../../theme"
import { CaregiverSidebar } from "../../components/layout/AppSidebar"
import "./CaregiverDashboard.css"

const STATS = [
    { label: "TASKS DONE", value: "3", suffix: "/5", sub: "2 remaining", subColor: theme.colors.warning },
    { label: "MOOD TODAY", value: "😊", emoji: true, sub: "Calm & happy", subColor: theme.colors.success },
    { label: "STREAK", value: "7", suffix: "d", sub: "🔥 Personal best", subColor: theme.colors.success },
    { label: "LAST SEEN", value: "8:42", small: true, sub: "AM today", subColor: "#A08060" },
]

const STATUS_CHIPS = [
    { label: "✓ Location safe", bg: "#4A8C3F22", color: "#6FBF65", border: "#4A8C3F44" },
    { label: "✗ Medicine missed", bg: "#C0482822", color: "#E8674A", border: "#C0482844" },
    { label: "⚠ Exercise pending", bg: "#C8874A22", color: "#E8974A", border: "#C8874A44" },
]

const FEED = [
    { id: 1, icon: "✅", iconBg: "#4A8C3F22", title: "Breakfast completed", time: "8:30 AM · 32 mins ago", badge: "Done", badgeBg: "#4A8C3F22", badgeColor: "#6FBF65" },
    { id: 2, icon: "💊", iconBg: "#C0482822", title: "Medicine reminder sent", time: "9:00 AM · No response", badge: "Missed", badgeBg: "#C0482822", badgeColor: "#E8674A" },
    { id: 3, icon: "🎙️", iconBg: "#C8874A22", title: "Spoke with companion", time: "8:42 AM · Mood: happy", badge: "Active", badgeBg: "#C8874A22", badgeColor: "#E8974A" },
    { id: 4, icon: "🧠", iconBg: "#4A8C3F22", title: "Memory exercise started", time: "Yesterday · 11:10 AM", badge: "Done", badgeBg: "#4A8C3F22", badgeColor: "#6FBF65" },
]

const navItems = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard", idx: 0 },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts", idx: 1 },
    { icon: "📍", label: "Location", path: "/caregiver/location", idx: 2 },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings", idx: 3 },
]

export default function CaregiverDashboard() {
    const navigate = useNavigate()

    return (
        <div className="cgdash-page">
            <div className="grain-overlay" style={{ opacity: 0.04 }} />
            <CaregiverSidebar />

            <div className="cgdash-body">
                <div className="cgdash-scroll">
                    <motion.header
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="cgdash-header"
                    >
                        <div>
                            <p className="cgdash-greeting">Good morning,</p>
                            <h1 className="cgdash-name">Dr. Meera</h1>
                        </div>
                        <motion.div whileTap={{ scale: 0.9 }} className="cgdash-avatar">👩‍⚕️</motion.div>
                    </motion.header>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/caregiver/alerts")}
                        className="cgdash-alert-strip"
                    >
                        <motion.div
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#C04828", flexShrink: 0 }}
                        />
                        <p className="cgdash-alert-text">
                            <strong>1 urgent alert</strong> — Clara missed morning medicine
                        </p>
                        <span className="cgdash-alert-arrow">→</span>
                    </motion.div>

                    <div className="cgdash-stats">
                        {STATS.map((s, i) => (
                            <motion.div key={s.label}
                                variants={scaleIn} initial="hidden" animate="visible" custom={2 + i}
                                className="cgdash-stat-card"
                            >
                                <p className="cgdash-stat-label">{s.label}</p>
                                <p className="cgdash-stat-value"
                                    style={s.emoji ? { fontSize: 32 } : s.small ? { fontSize: 20, marginTop: 4 } : {}}>
                                    {s.value}
                                    {s.suffix && <span className="cgdash-stat-suffix">{s.suffix}</span>}
                                </p>
                                <p className="cgdash-stat-sub" style={{ color: s.subColor }}>{s.sub}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="cgdash-section-header"
                    >
                        <span className="cgdash-section-title">PATIENT OVERVIEW</span>
                        <span className="cgdash-section-link">Edit</span>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}
                        className="cgdash-patient-card"
                    >
                        <div className="cgdash-patient-top">
                            <div className="cgdash-patient-avatar">🧓</div>
                            <div>
                                <p className="cgdash-patient-name">Clara Fernandez</p>
                                <p className="cgdash-patient-meta">72 years · Mild cognitive impairment</p>
                            </div>
                        </div>
                        <div className="cgdash-chips">
                            {STATUS_CHIPS.map(c => (
                                <span key={c.label} className="cgdash-chip"
                                    style={{ backgroundColor: c.bg, color: c.color, border: `0.5px solid ${c.border}` }}>
                                    {c.label}
                                </span>
                            ))}
                        </div>
                        <div>
                            <div className="cgdash-prog-label">
                                <span>Daily completion</span><span>60%</span>
                            </div>
                            <div className="cgdash-prog-bg">
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: "60%" }}
                                    transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#8B5E3C,#C8874A)" }}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={6}
                        className="cgdash-section-header"
                    >
                        <span className="cgdash-section-title">RECENT ACTIVITY</span>
                        <span className="cgdash-section-link">See all</span>
                    </motion.div>

                    <div className="cgdash-feed">
                        {FEED.map((item, i) => (
                            <motion.div key={item.id}
                                variants={fadeUp} initial="hidden" animate="visible" custom={7 + i}
                                whileHover={{ x: 2 }}
                                className="cgdash-feed-item"
                                style={{ borderBottom: i !== FEED.length - 1 ? "0.5px solid #3D2B1A" : "none" }}
                            >
                                <div className="cgdash-feed-icon" style={{ backgroundColor: item.iconBg }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p className="cgdash-feed-title">{item.title}</p>
                                    <p className="cgdash-feed-time">{item.time}</p>
                                </div>
                                <span className="cgdash-feed-badge"
                                    style={{ backgroundColor: item.badgeBg, color: item.badgeColor }}>
                                    {item.badge}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <nav className="cgdash-bottom-nav">
                    {navItems.map(item => (
                        <motion.button key={item.label} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            className={`cgdash-nav-item ${item.idx === 0 ? "active" : ""}`}>
                            <span className="cgdash-nav-icon">{item.icon}</span>
                            <span className="cgdash-nav-label">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    )
}