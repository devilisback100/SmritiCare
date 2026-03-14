import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, MoreHorizontal, Phone, MessageCircle } from "lucide-react"
import { fadeUp } from "../../variants"
import { CaregiverSidebar } from "../../components/layout/AppSidebar"
import "./AlertsNotifications.css"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const TABS = ["All", "Urgent", "Medicine", "Safety", "Routine"]

const navItems = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard", idx: 0 },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts", idx: 1 },
    { icon: "📍", label: "Location", path: "/caregiver/location", idx: 2 },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings", idx: 3 },
]

const TYPE_META = {
    missed_reminder: {
        icon: "💊", iconBg: "#C0482822", type: "urgent", category: "medicine",
        badge: "Urgent", badgeBg: "#C0482822", badgeColor: "#E8674A",
    },
    no_interaction: {
        icon: "😶", iconBg: "#C8874A22", type: "warning", category: "safety",
        badge: "Warning", badgeBg: "#C8874A22", badgeColor: "#E8974A",
    },
    location_safe: {
        icon: "📍", iconBg: "#4A8C3F22", type: "info", category: "safety",
        badge: "Info", badgeBg: "#4A8C3F22", badgeColor: "#6FBF65",
    },
    default: {
        icon: "🔔", iconBg: "#C8874A22", type: "warning", category: "routine",
        badge: "Warning", badgeBg: "#C8874A22", badgeColor: "#E8974A",
    },
}

const RESOLVED_STYLE = { badge: "Resolved", bg: "#4A8C3F22", color: "#6FBF65" }

function enrichAlert(raw) {
    const meta = TYPE_META[raw.type] || TYPE_META.default
    return {
        ...raw,
        ...meta,
        resolved: raw.resolved ?? false,
        title: raw.title || raw.type?.replace(/_/g, " ") || "Alert",
        desc: raw.desc || "",
        time: raw.time || raw.created_at || "",
        actions: raw.actions || (meta.type === "urgent" ? ["resolve", "call"] : ["resolve", "nudge"]),
    }
}

export default function AlertsNotifications() {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    const patientId = user?.patient_id || user?.id

    const [alerts, setAlerts] = useState([])
    const [activeTab, setActiveTab] = useState("All")
    const [loading, setLoading] = useState(true)

    const authHeader = () => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    })

    useEffect(() => {
        if (!patientId) return
        fetchAlerts()
    }, [patientId])


    const fetchAlerts = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/logic/realtime/${patientId}`, { headers: authHeader() })
            if (res.ok) {
                const data = await res.json()
                const raw = Array.isArray(data) ? data : data.alerts || []
                setAlerts(raw.map(enrichAlert))
            }
        } catch {
        } finally {
            setLoading(false)
        }
    }

    const createAlert = async (type) => {
        try {
            const res = await fetch(`${BASE_URL}/logic/alert`, {
                method: "POST",
                headers: authHeader(),
                body: JSON.stringify({ patient_id: patientId, type }),
            })
            if (res.ok) fetchAlerts()
        } catch { }
    }

    const resolve = (id) =>
        setAlerts(prev => prev.map(a => a._id === id || a.id === id ? { ...a, resolved: true } : a))

    const filtered = alerts.filter(a => {
        if (activeTab === "All") return true
        if (activeTab === "Urgent") return a.type === "urgent" && !a.resolved
        return a.category === activeTab.toLowerCase()
    })

    const urgentCount = alerts.filter(a => a.type === "urgent" && !a.resolved).length
    const warningCount = alerts.filter(a => a.type === "warning" && !a.resolved).length
    const resolvedCount = alerts.filter(a => a.resolved).length

    return (
        <div className="alerts-page">
            <div className="grain-overlay" style={{ opacity: 0.04 }} />
            <CaregiverSidebar />

            <div className="alerts-body">
                <div className="alerts-scroll">
                    <motion.header
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="alerts-header"
                    >
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="alerts-back-btn">
                            <ArrowLeft size={16} color="#A08060" />
                        </motion.button>
                        <div>
                            <p className="alerts-header-title">Alerts</p>
                            <p className="alerts-header-sub">
                                {user?.patient_name || "Patient"}
                            </p>
                        </div>
                        <motion.button whileTap={{ scale: 0.9 }} className="alerts-more-btn">
                            <MoreHorizontal size={16} color="#A08060" />
                        </motion.button>
                    </motion.header>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={1}
                        className="alerts-summary"
                    >
                        {[
                            { num: urgentCount, label: "Urgent", color: "#E8674A" },
                            { num: warningCount, label: "Warnings", color: "#E8974A" },
                            { num: resolvedCount, label: "Resolved", color: "#6FBF65" },
                        ].map(s => (
                            <div key={s.label} className="alerts-sum-card">
                                <p className="alerts-sum-num" style={{ color: s.color }}>{s.num}</p>
                                <p className="alerts-sum-label">{s.label}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="alerts-tabs"
                    >
                        {TABS.map(tab => (
                            <motion.button key={tab} whileTap={{ scale: 0.95 }}
                                onClick={() => setActiveTab(tab)}
                                className={`alerts-tab ${activeTab === tab ? "active" : ""}`}>
                                {tab}
                            </motion.button>
                        ))}
                    </motion.div>

                    <div className="alerts-list">
                        {loading ? (
                            <p style={{ color: "#A08060", fontSize: 14, padding: "16px" }}>Loading alerts...</p>
                        ) : (
                            <AnimatePresence>
                                {filtered.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="alerts-empty"
                                    >
                                        <p className="alerts-empty-icon">✅</p>
                                        <p className="alerts-empty-text">All clear — no alerts here</p>
                                    </motion.div>
                                )}

                                {filtered.map((alert, i) => {
                                    const id = alert._id || alert.id
                                    const style = alert.resolved
                                        ? RESOLVED_STYLE
                                        : { badge: alert.badge, bg: alert.badgeBg, color: alert.badgeColor }

                                    return (
                                        <motion.div key={id}
                                            variants={fadeUp} initial="hidden" animate="visible"
                                            exit={{ opacity: 0, x: 40, transition: { duration: 0.3 } }}
                                            custom={3 + i}
                                            className={`alerts-card ${alert.type === "urgent" && !alert.resolved ? "urgent-card" : "normal-card"} ${alert.resolved ? "resolved" : ""}`}
                                        >
                                            {alert.type === "urgent" && !alert.resolved && (
                                                <div className="alerts-urgent-bar" />
                                            )}
                                            <div className="alerts-card-body">
                                                <div className="alerts-card-icon" style={{ backgroundColor: alert.iconBg }}>
                                                    {alert.icon}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p className="alerts-card-title">{alert.title}</p>
                                                    <p className="alerts-card-desc">{alert.desc}</p>
                                                    <p className="alerts-card-time">{alert.time}</p>
                                                </div>
                                                <span className="alerts-badge"
                                                    style={{ backgroundColor: style.bg, color: style.color }}>
                                                    {style.badge}
                                                </span>
                                            </div>

                                            {alert.actions.length > 0 && !alert.resolved && (
                                                <div className="alerts-actions">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                        onClick={() => resolve(id)}
                                                        className="alerts-action-btn alerts-btn-resolve">
                                                        ✓ Mark resolved
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                                        onClick={() => createAlert(alert.actions.includes("call") ? "call_caregiver" : "nudge")}
                                                        className="alerts-action-btn alerts-btn-action">
                                                        {alert.actions.includes("call")
                                                            ? <><Phone size={11} /> Call Clara</>
                                                            : <><MessageCircle size={11} /> Send nudge</>}
                                                    </motion.button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        )}
                    </div>
                </div>

                <nav className="alerts-bottom-nav">
                    {navItems.map(item => (
                        <motion.button key={item.label} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            className={`alerts-nav-item ${item.idx === 1 ? "active" : ""}`}>
                            <span className="alerts-nav-icon">{item.icon}</span>
                            <span className="alerts-nav-label">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    )
}