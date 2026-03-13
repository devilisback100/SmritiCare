import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Filter } from "lucide-react"
import { fadeUp, scaleIn } from "../../variants"
import { PatientSidebar } from "../../components/layout/AppSidebar"
import "./CognitiveExercises.css"

const EXERCISES = [
    { id: 1, icon: "🔢", title: "Number sequence", time: "5 min", difficulty: "easy", locked: false },
    { id: 2, icon: "🧩", title: "Pattern recall", time: "8 min", difficulty: "medium", locked: false },
    { id: 3, icon: "📖", title: "Word association", time: "6 min", difficulty: "easy", locked: false },
    { id: 4, icon: "🗺️", title: "Spatial mapping", time: "12 min", difficulty: "hard", locked: false },
    { id: 5, icon: "🎨", title: "Colour memory", time: "7 min", difficulty: "medium", locked: true },
    { id: 6, icon: "🔤", title: "Letter scramble", time: "10 min", difficulty: "hard", locked: true },
]

const STREAK_DAYS = 7
const STREAK_TOTAL = 10

const navItems = [
    { icon: "🏠", label: "Home", path: "/patient/companion", idx: 0 },
    { icon: "📋", label: "Routine", path: "/patient/routine", idx: 1 },
    { icon: "🧠", label: "Exercises", path: "/patient/exercises", idx: 2 },
    { icon: "📖", label: "Journal", path: "/patient/journal", idx: 3 },
]

export default function CognitiveExercises() {
    const navigate = useNavigate()
    const [started, setStarted] = useState(false)

    return (
        <div className="exercises-page">
            <div className="grain-overlay" />
            <PatientSidebar />

            <div className="exercises-body">
                <div className="exercises-scroll">
                    <motion.header
                        variants={fadeUp} initial="hidden" animate="visible" custom={0}
                        className="exercises-header"
                    >
                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="exercises-back-btn">
                            <ArrowLeft size={16} color="#6B4C35" />
                        </motion.button>
                        <div>
                            <p className="exercises-header-title">Brain Exercises</p>
                            <p className="exercises-header-sub">Keep your mind sharp</p>
                        </div>
                        <div style={{ width: 36 }} />
                    </motion.header>

                    <motion.section
                        variants={scaleIn} initial="hidden" animate="visible" custom={1}
                        className="exercises-streak"
                    >
                        <div className="exercises-streak-glow" />
                        <div className="exercises-streak-top">
                            <span className="exercises-streak-label">CURRENT STREAK</span>
                            <span className="exercises-streak-badge">🔥 On fire!</span>
                        </div>
                        <p className="exercises-streak-num">{STREAK_DAYS}</p>
                        <p className="exercises-streak-sub">days in a row — keep going!</p>
                        <div className="exercises-streak-dots">
                            {Array.from({ length: STREAK_TOTAL }).map((_, i) => (
                                <motion.div key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.05 }}
                                    style={{
                                        flex: 1, height: 6, borderRadius: 99,
                                        backgroundColor: i < STREAK_DAYS ? "#C8874A" : "#FAF4ED22",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.section>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={2}
                        className="exercises-section-header"
                    >
                        <span className="exercises-section-title">TODAY'S CHALLENGE</span>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={3}
                        className="exercises-featured"
                    >
                        <div className="exercises-featured-top">
                            <div className="exercises-featured-glow" />
                            <p className="exercises-featured-emoji">🃏</p>
                            <h2 className="exercises-featured-title">Memory Match</h2>
                            <p className="exercises-featured-desc">
                                Flip cards and find matching pairs. Tests short-term memory and focus.
                            </p>
                            <div className="exercises-featured-tags">
                                {["⏱ 10 min", "🧠 Memory", "Medium"].map(tag => (
                                    <span key={tag} className="exercises-featured-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="exercises-featured-bottom">
                            <motion.button
                                whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                onClick={() => setStarted(!started)}
                                className="exercises-start-btn"
                                style={{ backgroundColor: started ? "#4A8C3F" : "#5C3D22", color: "#FAF4ED" }}
                            >
                                {started ? "Continue ▶" : "Start exercise"}
                            </motion.button>
                            <span className="exercises-xp">+50 XP on complete</span>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={4}
                        className="exercises-section-header"
                    >
                        <span className="exercises-section-title">ALL EXERCISES</span>
                        <motion.button whileTap={{ scale: 0.9 }}
                            className="exercises-section-link"
                            style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer" }}>
                            <Filter size={12} color="#8B5E3C" />Filter
                        </motion.button>
                    </motion.div>

                    <div className="exercises-grid">
                        {EXERCISES.map((ex, i) => (
                            <motion.div key={ex.id}
                                variants={fadeUp} initial="hidden" animate="visible" custom={5 + i}
                                whileHover={!ex.locked ? { y: -3, boxShadow: "0 6px 20px #2E1B0E11" } : {}}
                                whileTap={!ex.locked ? { scale: 0.97 } : {}}
                                className={`exercises-card ${ex.locked ? "locked" : ""}`}
                            >
                                {ex.locked && <span className="exercises-card-lock">🔒</span>}
                                <p className="exercises-card-icon">{ex.icon}</p>
                                <p className="exercises-card-title">{ex.title}</p>
                                <p className="exercises-card-time">⏱ {ex.time}</p>
                                <span className={`exercises-diff-badge diff-${ex.difficulty}`}>
                                    {ex.difficulty.charAt(0).toUpperCase() + ex.difficulty.slice(1)}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <nav className="exercises-bottom-nav">
                    {navItems.map(item => (
                        <motion.button key={item.label} whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(item.path)}
                            className={`exercises-nav-item ${item.idx === 2 ? "active" : ""}`}>
                            <span className="exercises-nav-icon">{item.icon}</span>
                            <span className="exercises-nav-label">{item.label}</span>
                        </motion.button>
                    ))}
                </nav>
            </div>
        </div>
    )
}