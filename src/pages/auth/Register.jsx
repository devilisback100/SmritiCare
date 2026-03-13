import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../variants"
import "./Register.css"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const roles = [
    { id: "patient", icon: "🧓", label: "Patient", desc: "Daily companion" },
    { id: "caregiver", icon: "🩺", label: "Caregiver", desc: "Monitor & manage" },
]

const INITIAL_FORM = { name: "", email: "", phone: "", password: "", confirmPassword: "" }

export default function Register() {
    const navigate = useNavigate()
    const [form, setForm] = useState(INITIAL_FORM)
    const [selectedRole, setSelectedRole] = useState("caregiver")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleChange = (field) => (e) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }))

    const validate = () => {
        if (!form.name.trim()) return "Name is required."
        if (!form.email.trim()) return "Email is required."
        if (!form.phone.trim()) return "Phone number is required."
        if (form.password.length < 4) return "Password must be at least 4 characters."
        if (form.password !== form.confirmPassword) return "Passwords do not match."
        return null
    }

    const handleRegister = async () => {
        setError("")
        const validationError = validate()
        if (validationError) {
            setError(validationError)
            return
        }

        setLoading(true)
        try {
            const res = await fetch(`${BASE_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    password: form.password,
                }),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data?.message || "Registration failed. Please try again.")
                return
            }

            navigate("/login")
        } catch {
            setError("Network error. Please check your connection.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="register-page">
            <div className="grain-overlay" />

            <div className="register-left-panel">
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

                <h2 className="register-left-heading">
                    Start your care<br />journey today.
                </h2>
                <p className="register-left-sub">
                    Join Clara and help your loved ones stay safe, supported, and connected — every single day.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 48 }}>
                    {[
                        { icon: "🔒", text: "Secure & private by design" },
                        { icon: "📱", text: "Works on any device" },
                        { icon: "🤝", text: "Trusted by caregivers across India" },
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

            <div className="register-right-panel">
                <motion.div
                    variants={fadeUp} initial="hidden" animate="visible" custom={0}
                    className="register-logo"
                >
                    <div className="register-logo-dot">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                            <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                            <circle cx="12" cy="9" r="2.5" />
                        </svg>
                    </div>
                    <span className="register-logo-text">Clara</span>
                </motion.div>

                <motion.div
                    variants={scaleIn} initial="hidden" animate="visible" custom={1}
                    className="register-card"
                >
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={2}>
                        <h1 className="register-title">Create account</h1>
                        <p className="register-subtitle">Set up your Clara account in seconds.</p>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}>
                        <label className="register-label">Full name</label>
                        <input
                            className="register-input"
                            type="text"
                            placeholder="Aryan Sharma"
                            value={form.name}
                            onChange={handleChange("name")}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}>
                        <label className="register-label">Email address</label>
                        <input
                            className="register-input"
                            type="email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange("email")}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={5}>
                        <label className="register-label">Phone number</label>
                        <input
                            className="register-input"
                            type="tel"
                            placeholder="9999999999"
                            value={form.phone}
                            onChange={handleChange("phone")}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={6}>
                        <label className="register-label">Password</label>
                        <input
                            className="register-input"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange("password")}
                        />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={7}>
                        <label className="register-label">Confirm password</label>
                        <input
                            className="register-input"
                            type="password"
                            placeholder="••••••••"
                            value={form.confirmPassword}
                            onChange={handleChange("confirmPassword")}
                        />
                    </motion.div>

                    <motion.div
                        variants={fadeUp} initial="hidden" animate="visible" custom={8}
                        className="register-divider"
                    >
                        <div className="register-divider-line" />
                        <span className="register-divider-text">I am a</span>
                        <div className="register-divider-line" />
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={9}>
                        <p className="register-role-label">Select your role</p>
                        <div className="register-role-grid">
                            {roles.map(role => (
                                <motion.div
                                    key={role.id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setSelectedRole(role.id)}
                                    className={`register-role-card ${selectedRole === role.id ? "active" : ""}`}
                                >
                                    <div className="register-role-icon">{role.icon}</div>
                                    <div className="register-role-name">{role.label}</div>
                                    <div className="register-role-desc">{role.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {error && (
                            <motion.p
                                key="error"
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                style={{
                                    color: "#FF6B6B", fontSize: 13,
                                    padding: "8px 12px", borderRadius: 8,
                                    backgroundColor: "#FF6B6B15",
                                    border: "0.5px solid #FF6B6B40",
                                }}
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>

                    <motion.button
                        variants={fadeUp} initial="hidden" animate="visible" custom={10}
                        whileHover={{ y: loading ? 0 : -2 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        onClick={handleRegister}
                        disabled={loading}
                        className="register-btn"
                        style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                    >
                        {loading ? "Creating account..." : "Create account →"}
                    </motion.button>

                    <motion.p
                        variants={fadeUp} initial="hidden" animate="visible" custom={11}
                        className="register-footer"
                    >
                        Already have an account?{" "}
                        <span
                            className="register-footer-link"
                            onClick={() => navigate("/login")}
                            style={{ cursor: "pointer" }}
                        >
                            Sign in
                        </span>
                    </motion.p>
                </motion.div>
            </div>
        </main>
    )
}