import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import "./LoginRoleSelect.css"

const roles = [
    { id: "patient", icon: "🧓", label: "Patient", desc: "Daily companion" },
    { id: "caregiver", icon: "🩺", label: "Caregiver", desc: "Monitor & manage" },
]

export default function LoginRoleSelect() {
    const [selectedRole, setSelectedRole] = useState("patient")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleContinue = () => {
        if (selectedRole === "patient") navigate("/patient/companion")
        if (selectedRole === "caregiver") navigate("/caregiver/dashboard")
    }

    return (
        <main className="login-page">
            <div className="grain-overlay" />

            {/* Desktop left panel */}
            <div className="login-left-panel">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 48 }}>
                    <div style={{
                        width: 40, height: 40, backgroundColor: "#C8874A",
                        borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                    </div>
                    <span style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 22, fontWeight: 500, color: "#FAF4ED"
                    }}>
                        Clara
                    </span>
                </div>
                <h2 className="login-left-heading">
                    A companion that<br />remembers with you.
                </h2>
                <p className="login-left-sub">
                    Clara helps people with memory challenges stay safe, follow their daily routines, and feel emotionally supported — every single day.
                </p>

                {/* Feature pills */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 48 }}>
                    {[
                        { icon: "🎙️", text: "Voice-guided daily routines" },
                        { icon: "💊", text: "Medicine & meal reminders" },
                        { icon: "📊", text: "Real-time caregiver dashboard" },
                    ].map(f => (
                        <div key={f.text} style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "12px 16px", borderRadius: 12,
                            backgroundColor: "#FAF4ED15",
                            border: "0.5px solid #FAF4ED20",
                        }}>
                            <span style={{ fontSize: 18 }}>{f.icon}</span>
                            <span style={{ fontSize: 14, color: "#FAF4EDCC" }}>{f.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right panel / full page on mobile */}
            <div className="login-right-panel">
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className="login-logo"
                >
                    <div className="login-logo-dot">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                    </div>
                    <span className="login-logo-text">Clara</span>
                </motion.div>

                <motion.div
                    variants={scaleIn} initial="hidden" animate="visible" custom={1}
                    className="login-card"
                >
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        <h1 className="login-title">Welcome back</h1>
                        <p className="login-subtitle">Sign in to continue your care journey.</p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <label className="login-label">Email address</label>
                        <input className="login-input" type="email"
                            placeholder="you@example.com"
                            value={email} onChange={e => setEmail(e.target.value)} />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                        <label className="login-label">Password</label>
                        <input className="login-input" type="password"
                            placeholder="••••••••"
                            value={password} onChange={e => setPassword(e.target.value)} />
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={5}
                        className="login-divider"
                    >
                        <div className="login-divider-line" />
                        <span className="login-divider-text">I am a</span>
                        <div className="login-divider-line" />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                        <p className="login-role-label">Select your role</p>
                        <div className="login-role-grid">
                            {roles.map(role => (
                                <motion.div key={role.id}
                                    whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`login-role-card ${selectedRole === role.id ? "active" : ""}`}
                                >
                                    <div className="login-role-icon">{role.icon}</div>
                                    <div className="login-role-name">{role.label}</div>
                                    <div className="login-role-desc">{role.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.button
                        variants={fadeUp} initial="hidden" animate="visible" custom={7}
                        whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
                        onClick={handleContinue}
                        className="login-btn"
                    >
                        Continue
                    </motion.button>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={8}
                        className="login-footer"
                    >
                        Don't have an account?{" "}
                        <span className="login-footer-link">Sign up</span>
                    </motion.p>
                </motion.div>
            </div>
        </main>
    )
}