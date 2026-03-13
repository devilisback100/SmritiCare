import { motion } from "framer-motion"
import { fadeUp, scaleIn } from "../../../variants"
import "./FeaturesSection.css"

const FEATURES = [
    {
        icon: "🎙️",
        title: "Voice companion",
        desc: "Clara speaks with your loved one every day — reminding, reassuring, and responding with warmth and patience.",
        color: "#FDE8D8",
    },
    {
        icon: "💊",
        title: "Medicine reminders",
        desc: "Timely nudges for medication, meals, and hydration — with automatic caregiver alerts if anything is missed.",
        color: "#EAF3DE",
    },
    {
        icon: "📋",
        title: "Daily routines",
        desc: "Structured morning to evening schedules tailored to each patient's cognitive level and personal preferences.",
        color: "#FEF3DC",
    },
    {
        icon: "🧠",
        title: "Brain exercises",
        desc: "Scientifically designed memory and cognitive exercises that adapt in difficulty as the patient improves.",
        color: "#E6F1FB",
    },
    {
        icon: "📊",
        title: "Caregiver dashboard",
        desc: "Real-time monitoring of mood, activity, medication adherence, and location — all in one clean dashboard.",
        color: "#F0E8DC",
    },
    {
        icon: "📍",
        title: "Safe zone alerts",
        desc: "Instant notifications if your loved one leaves a designated safe area, giving caregivers immediate peace of mind.",
        color: "#FDE8D8",
    },
]

export default function FeaturesSection() {
    return (
        <section className="features-section" id="features">
            <div className="features-bg" />
            <div className="section-container">

                <div className="features-header">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0}
                        className="section-label"
                    >
                        ✦ Everything you need
                    </motion.div>
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        className="section-heading"
                    >
                        Built for memory care,<br />from the ground up.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        className="section-subheading"
                    >
                        Every feature in Clara is designed around the real needs of people living with memory challenges and the caregivers who support them.
                    </motion.p>
                </div>

                <div className="features-grid">
                    {FEATURES.map((f, i) => (
                        <motion.div
                            key={i}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            whileHover={{ y: -4, boxShadow: "0 12px 40px #2E1B0E0E" }}
                            className="feature-card"
                        >
                            <div className="feature-card-icon" style={{ backgroundColor: f.color }}>
                                {f.icon}
                            </div>
                            <h3 className="feature-card-title">{f.title}</h3>
                            <p className="feature-card-desc">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}