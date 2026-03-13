import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import { theme } from "../../theme"
import { CaregiverSidebar } from "../../components/layout/AppSidebar"
import "./CaregiverDashboard.css"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const navItems = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard", idx: 0 },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts", idx: 1 },
    { icon: "📍", label: "Location", path: "/caregiver/location", idx: 2 },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings", idx: 3 },
]

const STATUS_CHIPS = [
    { label: "✓ Location safe", bg: "#4A8C3F22", color: "#6FBF65", border: "#4A8C3F44" },
    { label: "✗ Medicine missed", bg: "#C0482822", color: "#E8674A", border: "#C0482844" },
    { label: "⚠ Exercise pending", bg: "#C8874A22", color: "#E8974A", border: "#C8874A44" },
]

const FEED_ICON_MAP = {
    missed_reminder: { icon: "💊", iconBg: "#C0482822", badge: "Missed", badgeBg: "#C0482822", badgeColor: "#E8674A" },
    location: { icon: "📍", iconBg: "#4A8C3F22", badge: "Safe", badgeBg: "#4A8C3F22", badgeColor: "#6FBF65" },
    default: { icon: "🔔", iconBg: "#C8874A22", badge: "Active", badgeBg: "#C8874A22", badgeColor: "#E8974A" },
}

function formatTime(ts) {
    if (!ts) return ""
    const d = new Date(ts)
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

export default function CaregiverDashboard() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const patientId = user?.patient_id || user?.id

    const [patient, setPatient] = useState(null)
    const [reminders, setReminders] = useState([])
    const [realtimeStatus, setRealtimeStatus] = useState({ alert: null, reminder: null })
    const [loading, setLoading] = useState(true)

    const authHeader = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    })

    useEffect(() => {
        if (!patientId) return

        const fetchDashboard = async () => {
            try {
                const [patientRes, reminderRes] = await Promise.all([
                    fetch(`${BASE_URL}/patients/${patientId}`, { headers: authHeader() }),
                    fetch(`${BASE_URL}/logic/reminder/${patientId}`, { headers: authHeader() }),
                ])

                if (patientRes.ok) {
                    const data = await patientRes.json()
                    setPatient(data.patient)
                }

                if (reminderRes.ok) {
                    const data = await reminderRes.json()
                    setReminders(data.reminders || [])
                }
            } catch {
            } finally {
                setLoading(false)
            }
        }

        fetchDashboard()
    }, [patientId])

    useEffect(() => {
        if (!patientId) return

        const poll = async () => {
            try {
                const res = await fetch(`${BASE_URL}/logic/realtime/${patientId}`, { headers: authHeader() })
                if (res.ok) {
                    const data = await res.json()
                    setRealtimeStatus(data)
                }
            } catch { }
        }

        poll()
        const interval = setInterval(poll, 5000)
        return () => clearInterval(interval)
    }, [patientId])

    const tasksTotal = reminders.length
    const tasksDone = reminders.filter(r => r.done).length
    const completionPct = tasksTotal > 0 ? Math.round((tasksDone / tasksTotal) * 100) : 0

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
                            <h1 className="cgdash-name">{user?.name || "Caregiver"}</h1>
                        </div>
                        <motion.div whileTap={{ scale: 0.9 }} className="cgdash-avatar">👩‍⚕️</motion.div>
                    </motion.header>

                    {realtimeStatus.alert && (
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
                                <strong>1 urgent alert</strong> — action needed
                            </p>
                            <span className="cgdash-alert-arrow">→</span>
                        </motion.div>
                    )}

                    <div className="cgdash-stats">
                        {[
                            {
                                label: "TASKS DONE", value: `${tasksDone}`, suffix: `/${tasksTotal}`,
                                sub: `${tasksTotal - tasksDone} remaining`, subColor: theme.colors.warning
                            },
                            {
                                label: "STREAK", value: "7", suffix: "d",
                                sub: "🔥 Personal best", subColor: theme.colors.success
                            },
                            {
                                label: "REMINDERS", value: `${tasksTotal}`, suffix: "",
                                sub: "scheduled today", subColor: "#A08060"
                            },
                            {
                                label: "STATUS", value: realtimeStatus.alert ? "⚠️" : "✅", emoji: true,
                                sub: realtimeStatus.alert ? "Needs attention" : "All good",
                                subColor: realtimeStatus.alert ? theme.colors.warning : theme.colors.success
                            },
                        ].map((s, i) => (
                            <motion.div key={s.label}
                                variants={scaleIn} initial="hidden" animate="visible" custom={2 + i}
                                className="cgdash-stat-card"
                            >
                                <p className="cgdash-stat-label">{s.label}</p>
                                <p className="cgdash-stat-value"
                                    style={s.emoji ? { fontSize: 32 } : {}}>
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
                        {loading ? (
                            <p style={{ color: "#A08060", fontSize: 14 }}>Loading patient data...</p>
                        ) : (
                            <>
                                <div className="cgdash-patient-top">
                                    <div className="cgdash-patient-avatar">🧓</div>
                                    <div>
                                        <p className="cgdash-patient-name">{patient?.display_name || "—"}</p>
                                        <p className="cgdash-patient-meta">
                                            {patient?.birth_year
                                                ? `${new Date().getFullYear() - patient.birth_year} years`
                                                : "—"} · {patient?.gender || "—"}
                                        </p>
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
                                        <span>Daily completion</span>
                                        <span>{completionPct}%</span>
                                    </div>
                                    <div className="cgdash-prog-bg">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${completionPct}%` }}
                                            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                            style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#8B5E3C,#C8874A)" }}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={6}
                        className="cgdash-section-header"
                    >
                        <span className="cgdash-section-title">TODAY'S REMINDERS</span>
                        <span className="cgdash-section-link">See all</span>
                    </motion.div>

                    <div className="cgdash-feed">
                        {loading ? (
                            <p style={{ color: "#A08060", fontSize: 14, padding: "16px" }}>Loading reminders...</p>
                        ) : reminders.length === 0 ? (
                            <p style={{ color: "#A08060", fontSize: 14, padding: "16px" }}>No reminders for today.</p>
                        ) : (
                            reminders.map((item, i) => {
                                const style = FEED_ICON_MAP[item.type] || FEED_ICON_MAP.default
                                return (
                                    <motion.div key={item._id}
                                        variants={fadeUp} initial="hidden" animate="visible" custom={7 + i}
                                        whileHover={{ x: 2 }}
                                        className="cgdash-feed-item"
                                        style={{ borderBottom: i !== reminders.length - 1 ? "0.5px solid #3D2B1A" : "none" }}
                                    >
                                        <div className="cgdash-feed-icon" style={{ backgroundColor: style.iconBg }}>
                                            {style.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p className="cgdash-feed-title">{item.text}</p>
                                            <p className="cgdash-feed-time">{item.time}</p>
                                        </div>
                                        <span className="cgdash-feed-badge"
                                            style={{ backgroundColor: style.badgeBg, color: style.badgeColor }}>
                                            {style.badge}
                                        </span>
                                    </motion.div>
                                )
                            })
                        )}
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