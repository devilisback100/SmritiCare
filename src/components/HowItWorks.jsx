import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, slideRight } from "../../../variants"
import "./HowItWorks.css"

const STEPS = [
    {
        num: "01",
        icon: "👤",
        title: "Create a profile",
        desc: "Set up your loved one's profile with their daily schedule, medication list, dietary needs, and cognitive baseline.",
    },
    {
        num: "02",
        icon: "🎙️",
        title: "Meet Clara",
        desc: "Clara introduces herself and begins having warm, daily conversations — morning greetings, reminders, and gentle check-ins.",
    },
    {
        num: "03",
        icon: "📊",
        title: "You stay informed",
        desc: "The caregiver dashboard updates in real time. Get alerts, view activity logs, and track wellbeing trends over weeks.",
    },
    {
        num: "04",
        icon: "🧠",
        title: "Clara learns & adapts",
        desc: "Over time, Clara learns your loved one's preferences and patterns, making her support more personalised every day.",
    },
]

export default function HowItWorks() {
    const navigate = useNavigate()

    return (
        <section className="hiw-section" id="how-it-works">
            <div className="section-container">
                <div className="hiw-header">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={0}
                        className="section-label"
                    >
                        🗺️ How it works
                    </motion.div>
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={1}
                        className="section-heading"
                    >
                        Up and running<br />in minutes.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={2}
                        className="section-subheading"
                    >
                        No technical setup, no complicated onboarding. Clara is ready to start caring from day one.
                    </motion.p>
                </div>

                <div className="hiw-steps">
                    {STEPS.map((step, i) => (
                        <motion.div
                            key={i}
                            variants={slideRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            className="hiw-step"
                        >
                            {/* Connector line */}
                            {i !== STEPS.length - 1 && (
                                <div className="hiw-connector" />
                            )}

                            <div className="hiw-step-left">
                                <div className="hiw-step-icon-wrap">
                                    <span className="hiw-step-num">{step.num}</span>
                                    <div className="hiw-step-icon">{step.icon}</div>
                                </div>
                            </div>

                            <div className="hiw-step-right">
                                <h3 className="hiw-step-title">{step.title}</h3>
                                <p className="hiw-step-desc">{step.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA banner */}
                <motion.div
                    variants={fadeUp} initial="hidden" whileInView="visible"
                    viewport={{ once: true }} custom={0}
                    className="hiw-cta-banner"
                >
                    <div className="hiw-cta-glow" />
                    <div className="hiw-cta-content">
                        <h3 className="hiw-cta-title">Ready to give your loved one a companion?</h3>
                        <p className="hiw-cta-sub">Join thousands of families already using Clara.</p>
                    </div>
                    <motion.button
                        whileHover={{ y: -2, boxShadow: "0 8px 24px #00000033" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/login")}
                        className="hiw-cta-btn"
                    >
                        Get started free →
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}