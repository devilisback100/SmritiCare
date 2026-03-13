import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import "./LoginRoleSelect.css"

const BASE_URL = "https://23ljjvd2-3000.inc1.devtunnels.ms/"

const roles = [
    { id: "patient", icon: "🧓", label: "Patient", desc: "Daily companion" },
    { id: "caregiver", icon: "🩺", label: "Caregiver", desc: "Monitor & manage" },
]

const ROLE_REDIRECT = {
    patient: "/patient/companion",
    caregiver: "/caregiver/dashboard",
}

export default function LoginRoleSelect() {
    const [selectedRole, setSelectedRole] = useState("patient")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleContinue = async () => {
        setError("")

        if (!email.trim() || !password.trim()) {
            setError("Please enter your email and password.")
            return
        }

        setLoading(true)

        try {
            const res = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data?.message || "Invalid credentials. Please try again.")
                return
            }

            localStorage.setItem("access_token", data.access_token)
            localStorage.setItem("refresh_token", data.refresh_token)
            localStorage.setItem("user", JSON.stringify(data.user))

            navigate(ROLE_REDIRECT[selectedRole])
        } catch {
            setError("Network error. Please check your connection.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="login-page">
            <div className="grain-overlay" />

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
                    Clara helps people with memory challenges stay safe, follow their daily routines,
                    and feel emotionally supported — every single day.
                </p>

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
                        <input
                            className="login-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                        <label className="login-label">Password</label>
                        <input
                            className="login-input"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                key="error"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                style={{
                                    color: "#FF6B6B",
                                    fontSize: 13,
                                    marginTop: -8,
                                    marginBottom: 4,
                                    padding: "8px 12px",
                                    borderRadius: 8,
                                    backgroundColor: "#FF6B6B15",
                                    border: "0.5px solid #FF6B6B40",
                                }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

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
                                <motion.div
                                    key={role.id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
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
                        whileHover={{ y: loading ? 0 : -2 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        onClick={handleContinue}
                        disabled={loading}
                        className="login-btn"
                        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Signing in..." : "Continue"}
                    </motion.button>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={8}
                        className="login-footer"
                    >
                        Don't have an account?{" "}
                        <span
                            className="login-footer-link"
                            onClick={() => navigate("/register")}
                            style={{ cursor: "pointer" }}
                        >
                            Sign up
                        </span>
                    </motion.p>
                </motion.div>
            </div>
        </main>
    )
}