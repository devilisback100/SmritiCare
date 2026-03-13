import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { fadeUp } from "../../variants"
import { PatientSidebar } from "../../components/layout/AppSidebar"
import "./DailyRoutine.css"

const ALL_TASKS = [
    { id: 1, time: "7:00 AM", icon: "🌅", bg: "#FEF3DC", title: "Wake up & stretch", desc: "5 min light movement", period: "morning", done: true, activeNow: false },
    { id: 2, time: "8:00 AM", icon: "🍳", bg: "#FDE8D8", title: "Breakfast", desc: "Oats with fruit", period: "morning", done: true, activeNow: false },
    { id: 3, time: "9:00 AM", icon: "💊", bg: "#FDE8D8", title: "Morning medicine", desc: "Amlodipine 5mg · 1 tablet", period: "morning", done: false, activeNow: true },
    { id: 4, time: "11:00 AM", icon: "🧠", bg: "#EAF3DE", title: "Memory exercise", desc: "Pattern matching · 10 min", period: "morning", done: false, activeNow: false },
    { id: 5, time: "1:00 PM", icon: "🥗", bg: "#E6F1FB", title: "Lunch", desc: "Rice, dal, vegetables", period: "afternoon", done: false, activeNow: false },
    { id: 6, time: "4:00 PM", icon: "🚶", bg: "#EAF3DE", title: "Evening walk", desc: "15 min outdoors", period: "afternoon", done: false, activeNow: false },
    { id: 7, time: "8:00 PM", icon: "💊", bg: "#FDE8D8", title: "Night medicine", desc: "Metformin 500mg · 1 tablet", period: "evening", done: false, activeNow: false },
]

const TABS = ["All", "Morning", "Afternoon", "Evening"]

const navItems = [
    { icon: "🏠", label: "Home", path: "/patient/companion", idx: 0 },
    { icon: "📋", label: "Routine", path: "/patient/routine", idx: 1 },
    { icon: "🧠", label: "Exercises", path: "/patient/exercises", idx: 2 },
    { icon: "📖", label: "Journal", path: "/patient/journal", idx: 3 },
]

export default function DailyRoutine() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState(ALL_TASKS)
    const [activeTab, setActiveTab] = useState("All")

    const toggle = (id) => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t))
    const filtered = activeTab === "All" ? tasks : tasks.filter(t => t.period === activeTab.toLowerCase())
    const doneCount = tasks.filter(t => t.done).length
    const progress = Math.round((doneCount / tasks.length) * 100)

    return (
        <div className="routine-page">
            <div className="grain-overlay" />
            <PatientSidebar />

            <div className="routine-body">
                <motion.header
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className="routine-header"
                >
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="routine-back-btn">
                        <ArrowLeft size={16} color="#6B4C35" />
                    </motion.button>
                    <div>
                        <p className="routine-header-title">Daily Routine</p>
                        <p className="routine-header-date">
                            {new Date().toLocaleDateString("en-US", { weekday: "long", day: "numeric", month: "long" })}
                        </p>
                    </div>
                    <div style={{ width: 36 }} />
                </motion.header>

                <motion.section
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                    className="routine-progress-wrap"
                >
                    <div className="routine-progress-header">
                        <span className="routine-progress-label">Today's progress</span>
                        <div>
                            <span className="routine-progress-count">{doneCount}</span>
                            <span className="routine-progress-sub"> / {tasks.length} done</span>
                        </div>
                    </div>
                    <div className="routine-progress-bar-bg">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#8B5E3C,#C8874A)" }}
                        />
                    </div>
                </motion.section>

                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={2}
                    className="routine-tabs"
                >
                    {TABS.map(tab => (
                        <motion.button key={tab} whileTap={{ scale: 0.95 }}
                            onClick={() => setActiveTab(tab)}
                            className={`routine-tab ${activeTab === tab ? "active" : ""}`}>
                            {tab}
                        </motion.button>
                    ))}
                </motion.div>

                <section className="routine-timeline">
                    {filtered.map((task, i) => (
                        <div key={task.id} className="routine-tl-item">
                            {i !== filtered.length - 1 && <div className="routine-tl-connector" />}
                            <div className="routine-tl-left">
                                <motion.div
                                    variants={fadeUp} initial="hidden" animate="visible" custom={3 + i}
                                    className="routine-tl-dot" style={{ backgroundColor: task.bg }}>
                                    {task.icon}
                                </motion.div>
                                <span className="routine-tl-time">{task.time}</span>
                            </div>
                            <div className="routine-tl-right">
                                <motion.div
                                    variants={fadeUp} initial="hidden" animate="visible" custom={3 + i}
                                    whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}
                                    className={`routine-tl-card ${task.activeNow ? "active-now" : ""} ${task.done ? "done" : ""}`}
                                >
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center" }}>
                                            <p className={`routine-tl-card-title ${task.done ? "strikethrough" : ""}`}>
                                                {task.title}
                                            </p>
                                            {task.activeNow && <span className="routine-now-pill">Now</span>}
                                        </div>
                                        <p className="routine-tl-card-desc">{task.desc}</p>
                                    </div>
                                    <motion.button whileTap={{ scale: 0.85 }}
                                        onClick={() => toggle(task.id)}
                                        className={`routine-checkbox ${task.done ? "checked" : ""}`}>
                                        {task.done && (
                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                                                style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>✓</motion.span>
                                        )}
                                    </motion.button>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </section>

                <nav className="routine-bottom-nav">
                    {navItems.map(item => (
                        <motion.button key={item.label} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            className={`routine-nav-item ${item.idx === 1 ? "active" : ""}`}>
                            <span className="routine-nav-icon">{item.icon}</span>
                            <span className="routine-nav-label">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    )
}