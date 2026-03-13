import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, MoreHorizontal, Phone, MessageCircle } from "lucide-react"
import { fadeUp } from "../../variants"
import { CaregiverSidebar } from "../../components/layout/AppSidebar"
import "./AlertsNotifications.css"

const ALERTS_DATA = [
    { id: 1, icon: "💊", iconBg: "#C0482822", title: "Morning medicine missed", desc: "Clara has not taken Amlodipine 5mg. Reminder sent 3 times.", time: "Today · 9:00 AM", type: "urgent", category: "medicine", resolved: false, actions: ["resolve", "call"] },
    { id: 2, icon: "🚶", iconBg: "#C8874A22", title: "Exercise not started", desc: "Memory exercise at 11:00 AM has not been opened yet.", time: "Today · 11:30 AM", type: "warning", category: "routine", resolved: false, actions: ["resolve", "nudge"] },
    { id: 3, icon: "😶", iconBg: "#C8874A22", title: "No interaction for 90 mins", desc: "Clara hasn't responded to companion since 8:42 AM.", time: "Today · 10:12 AM", type: "warning", category: "safety", resolved: false, actions: ["resolve", "call"] },
    { id: 4, icon: "🍳", iconBg: "#4A8C3F22", title: "Breakfast reminder", desc: "Clara confirmed breakfast at 8:30 AM.", time: "Today · 8:30 AM", type: "info", category: "routine", resolved: true, actions: [] },
    { id: 5, icon: "📍", iconBg: "#4A8C3F22", title: "Location verified", desc: "Clara is within the safe zone — home as expected.", time: "Today · 7:45 AM", type: "info", category: "safety", resolved: true, actions: [] },
]

const TABS = ["All", "Urgent", "Medicine", "Safety", "Routine"]

const typeStyle = {
    urgent: { badge: "Urgent", bg: "#C0482822", color: "#E8674A" },
    warning: { badge: "Warning", bg: "#C8874A22", color: "#E8974A" },
    info: { badge: "Info", bg: "#8B5E3C44", color: "#C8874A" },
    resolved: { badge: "Resolved", bg: "#4A8C3F22", color: "#6FBF65" },
}

const navItems = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard", idx: 0 },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts", idx: 1 },
    { icon: "📍", label: "Location", path: "/caregiver/location", idx: 2 },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings", idx: 3 },
]

export default function AlertsNotifications() {
    const navigate = useNavigate()
    const [alerts, setAlerts] = useState(ALERTS_DATA)
    const [activeTab, setActiveTab] = useState("All")

    const resolve = (id) =>
        setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a))

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
                            <p className="alerts-header-sub">Clara Fernandez</p>
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
                                const style = alert.resolved ? typeStyle.resolved : typeStyle[alert.type]
                                return (
                                    <motion.div key={alert.id}
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
                                                    onClick={() => resolve(alert.id)}
                                                    className="alerts-action-btn alerts-btn-resolve">
                                                    ✓ Mark resolved
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
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