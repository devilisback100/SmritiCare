import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeUp } from "../variants"
import "./ContactSection.css"

const BASE_URL = import.meta.env.VITE_BACKEND_URL

const INITIAL_FORM = { name: "", email: "", message: "" }

export default function ContactSection() {
    const [form, setForm] = useState(INITIAL_FORM)
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleChange = (field) => (e) =>
        setForm(prev => ({ ...prev, [field]: e.target.value }))

    const handleSubmit = async () => {
        setError("")

        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            setError("Please fill in all fields.")
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
                    message: form.message,
                }),
            })

            if (res.ok) {
                setSent(true)
                setForm(INITIAL_FORM)
            } else {
                const data = await res.json()
                setError(data?.message || "Something went wrong. Please try again.")
            }
        } catch {
            setError("Network error. Please check your connection.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="contact-section" id="contact">
            <div className="section-container contact-container">

                <div className="contact-left">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={0}
                        className="section-label"
                    >
                        ✉️ Get in touch
                    </motion.div>
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={1}
                        className="section-heading"
                    >
                        We'd love to<br />hear from you.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={2}
                        className="section-subheading"
                    >
                        Questions about Clara, enterprise pricing, or just want to chat? We're here.
                    </motion.p>

                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={3}
                        className="contact-details"
                    >
                        {[
                            { icon: "📧", label: "Email", value: "hello@clara.care" },
                            { icon: "💬", label: "Live chat", value: "Available Mon–Fri, 9–6 IST" },
                            { icon: "📍", label: "Location", value: "Bengaluru, India" },
                        ].map(d => (
                            <div key={d.label} className="contact-detail-row">
                                <div className="contact-detail-icon">{d.icon}</div>
                                <div>
                                    <p className="contact-detail-label">{d.label}</p>
                                    <p className="contact-detail-value">{d.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once: true }} custom={2}
                    className="contact-form-card"
                >
                    <AnimatePresence mode="wait">
                        {sent ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="contact-success"
                            >
                                <div className="contact-success-icon">✅</div>
                                <h3 className="contact-success-title">Message sent!</h3>
                                <p className="contact-success-sub">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h3 className="contact-form-title">Send us a message</h3>

                                <div className="contact-form-row">
                                    <div className="contact-form-group">
                                        <label className="contact-label">Full name</label>
                                        <input
                                            className="contact-input"
                                            placeholder="Your name"
                                            value={form.name}
                                            onChange={handleChange("name")}
                                        />
                                    </div>
                                    <div className="contact-form-group">
                                        <label className="contact-label">Email</label>
                                        <input
                                            className="contact-input"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={form.email}
                                            onChange={handleChange("email")}
                                        />
                                    </div>
                                </div>

                                <div className="contact-form-group">
                                    <label className="contact-label">Message</label>
                                    <textarea
                                        className="contact-input contact-textarea"
                                        placeholder="Tell us how we can help..."
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange("message")}
                                    />
                                </div>

                                <AnimatePresence>
                                    {error && (
                                        <motion.p
                                            key="err"
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            style={{
                                                color: "#E8674A", fontSize: 13, marginBottom: 12,
                                                padding: "8px 12px", borderRadius: 8,
                                                backgroundColor: "#C0482815",
                                                border: "0.5px solid #C0482840",
                                            }}
                                        >
                                            {error}
                                        </motion.p>
                                    )}
                                </AnimatePresence>

                                <motion.button
                                    whileHover={{ y: loading ? 0 : -2 }}
                                    whileTap={{ scale: loading ? 1 : 0.97 }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="contact-submit-btn"
                                    style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
                                >
                                    {loading ? "Sending..." : "Send message →"}
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    )
}