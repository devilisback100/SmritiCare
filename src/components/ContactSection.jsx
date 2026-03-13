import { useState } from "react"
import { motion } from "framer-motion"
import { fadeUp } from "../../../variants"
import "./ContactSection.css"

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [sent, setSent] = useState(false)

    const handleSubmit = () => {
        if (!form.name || !form.email || !form.message) return
        setSent(true)
    }

    return (
        <section className="contact-section" id="contact">
            <div className="section-container contact-container">

                {/* Left */}
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

                {/* Right — form */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once: true }} custom={2}
                    className="contact-form-card"
                >
                    {sent ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="contact-success"
                        >
                            <div className="contact-success-icon">✅</div>
                            <h3 className="contact-success-title">Message sent!</h3>
                            <p className="contact-success-sub">We'll get back to you within 24 hours.</p>
                        </motion.div>
                    ) : (
                        <>
                            <h3 className="contact-form-title">Send us a message</h3>

                            <div className="contact-form-row">
                                <div className="contact-form-group">
                                    <label className="contact-label">Full name</label>
                                    <input
                                        className="contact-input"
                                        placeholder="Your name"
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                    />
                                </div>
                                <div className="contact-form-group">
                                    <label className="contact-label">Email</label>
                                    <input
                                        className="contact-input"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={form.email}
                                        onChange={e => setForm({ ...form, email: e.target.value })}
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
                                    onChange={e => setForm({ ...form, message: e.target.value })}
                                />
                            </div>

                            <motion.button
                                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                                onClick={handleSubmit}
                                className="contact-submit-btn"
                            >
                                Send message →
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </div>
        </section>
    )
}