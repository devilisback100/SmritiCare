import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import { CaregiverSidebar } from "../../components/layout/AppSidebar"
import "./CaregiverDashboard.css"

const BASE_URL = (import.meta.env.VITE_BACKEND_URL || "").replace(/\/$/, "")

const navItems = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard", idx: 0 },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts", idx: 1 },
    { icon: "📍", label: "Location", path: "/caregiver/location", idx: 2 },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings", idx: 3 },
]

function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
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
    const patientAge = patient?.birth_year
        ? new Date().getFullYear() - patient.birth_year
        : null

    return (
        <div className="cgdash-page">
            <div className="grain-overlay" style={{ opacity: 0.04 }} />
            <CaregiverSidebar />

            <div className="cgdash-body">
                <div className="cgdash-scroll">

                    {/* Header */}
                    <motion.header
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="cgdash-header"
                    >
                        <div>
                            <p className="cgdash-greeting">{getGreeting()},</p>
                            <h1 className="cgdash-name">{user?.name || "Caregiver"}</h1>
                        </div>
                        <motion.div whileTap={{ scale: 0.9 }} className="cgdash-avatar">👩‍⚕️</motion.div>
                    </motion.header>

                    {/* Alert strip — only shown when real alert exists */}
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
                                <strong>Urgent alert</strong> — action needed
                            </p>
                            <span className="cgdash-alert-arrow">→</span>
                        </motion.div>
                    )}

                    {/* Stats — only real data, no fake values */}
                    {tasksTotal > 0 && (
                        <div className="cgdash-stats">
                            {[
                                {
                                    label: "TASKS DONE",
                                    value: `${tasksDone}`,
                                    suffix: `/${tasksTotal}`,
                                    sub: tasksDone === tasksTotal ? "All done 🎉" : `${tasksTotal - tasksDone} remaining`,
                                    subColor: tasksDone === tasksTotal ? "#6FBF65" : "#E8974A",
                                },
                                {
                                    label: "COMPLETION",
                                    value: `${completionPct}`,
                                    suffix: "%",
                                    sub: "today's progress",
                                    subColor: "#A08060",
                                },
                            ].map((s, i) => (
                                <motion.div key={s.label}
                                    variants={scaleIn} initial="hidden" animate="visible" custom={2 + i}
                                    className="cgdash-stat-card"
                                >
                                    <p className="cgdash-stat-label">{s.label}</p>
                                    <p className="cgdash-stat-value">
                                        {s.value}
                                        {s.suffix && <span className="cgdash-stat-suffix">{s.suffix}</span>}
                                    </p>
                                    <p className="cgdash-stat-sub" style={{ color: s.subColor }}>{s.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Patient Overview */}
                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="cgdash-section-header"
                    >
                        <span className="cgdash-section-title">PATIENT OVERVIEW</span>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="cgdash-patient-card"
                    >
                        {loading ? (
                            <p style={{ color: "#A08060", fontSize: 14 }}>Loading...</p>
                        ) : !patient ? (
                            <div style={{ textAlign: "center", padding: "20px 0" }}>
                                <p style={{ fontSize: 28, marginBottom: 8 }}>🧓</p>
                                <p style={{ color: "#A08060", fontSize: 14 }}>No patient linked yet.</p>
                                <p style={{ color: "#5A3E28", fontSize: 12, marginTop: 4 }}>
                                    Ask your admin to link a patient to your account.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="cgdash-patient-top">
                                    <div className="cgdash-patient-avatar">🧓</div>
                                    <div>
                                        <p className="cgdash-patient-name">{patient.display_name}</p>
                                        <p className="cgdash-patient-meta">
                                            {patientAge ? `${patientAge} years` : "Age unknown"}
                                            {patient.gender ? ` · ${patient.gender}` : ""}
                                        </p>
                                    </div>
                                </div>

                                {tasksTotal > 0 && (
                                    <div style={{ marginTop: 12 }}>
                                        <div className="cgdash-prog-label">
                                            <span>Daily completion</span>
                                            <span>{completionPct}%</span>
                                        </div>
                                        <div className="cgdash-prog-bg">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${completionPct}%` }}
                                                transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                style={{
                                                    height: "100%", borderRadius: 99,
                                                    background: "linear-gradient(90deg,#8B5E3C,#C8874A)"
                                                }}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div style={{
                                    marginTop: 12, padding: "10px 14px", borderRadius: 10,
                                    backgroundColor: realtimeStatus.alert ? "#C0482812" : "#4A8C3F12",
                                    border: `0.5px solid ${realtimeStatus.alert ? "#C0482830" : "#4A8C3F30"}`,
                                    display: "flex", alignItems: "center", gap: 8,
                                }}>
                                    <span style={{ fontSize: 16 }}>
                                        {realtimeStatus.alert ? "⚠️" : "✅"}
                                    </span>
                                    <span style={{
                                        fontSize: 13,
                                        color: realtimeStatus.alert ? "#E8674A" : "#6FBF65"
                                    }}>
                                        {realtimeStatus.alert ? "Needs attention right now" : "Everything looks good"}
                                    </span>
                                </div>
                            </>
                        )}
                    </motion.div>

                    {/* Reminders */}
                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}
                        className="cgdash-section-header"
                    >
                        <span className="cgdash-section-title">TODAY'S REMINDERS</span>
                        <span className="cgdash-section-link">See all</span>
                    </motion.div>

                    <div className="cgdash-feed">
                        {loading ? (
                            <p style={{ color: "#A08060", fontSize: 14, padding: "16px" }}>Loading reminders...</p>
                        ) : reminders.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "28px 0" }}>
                                <p style={{ fontSize: 28, marginBottom: 8 }}>📋</p>
                                <p style={{ color: "#A08060", fontSize: 14 }}>No reminders scheduled yet.</p>
                            </div>
                        ) : (
                            reminders.map((item, i) => (
                                <motion.div key={item._id}
                                    variants={fadeUp} initial="hidden" animate="visible" custom={6 + i}
                                    whileHover={{ x: 2 }}
                                    className="cgdash-feed-item"
                                    style={{ borderBottom: i !== reminders.length - 1 ? "0.5px solid #3D2B1A" : "none" }}
                                >
                                    <div className="cgdash-feed-icon" style={{ backgroundColor: "#C8874A22" }}>
                                        💊
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p className="cgdash-feed-title">{item.text}</p>
                                        <p className="cgdash-feed-time">{item.time}</p>
                                    </div>
                                    <span className="cgdash-feed-badge" style={{
                                        backgroundColor: item.done ? "#4A8C3F22" : "#C8874A22",
                                        color: item.done ? "#6FBF65" : "#E8974A",
                                    }}>
                                        {item.done ? "Done" : "Pending"}
                                    </span>
                                </motion.div>
                            ))
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