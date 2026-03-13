import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { fadeUp, scaleIn } from "../../../variants"
import "./PricingSection.css"

const PLANS = [
    {
        name: "Family",
        price: { monthly: 9, yearly: 7 },
        desc: "Perfect for a single patient at home.",
        highlight: false,
        features: [
            "1 patient profile",
            "Voice companion (daily)",
            "Medicine & routine reminders",
            "Basic caregiver dashboard",
            "Email support",
        ],
    },
    {
        name: "Care Pro",
        price: { monthly: 24, yearly: 19 },
        desc: "For caregivers who need deeper insights.",
        highlight: true,
        badge: "Most popular",
        features: [
            "Up to 3 patient profiles",
            "Full voice companion access",
            "Real-time alerts & safe zone",
            "Advanced caregiver dashboard",
            "Cognitive exercise library",
            "Priority support",
        ],
    },
    {
        name: "Clinic",
        price: { monthly: 79, yearly: 65 },
        desc: "For clinics, care homes and facilities.",
        highlight: false,
        features: [
            "Unlimited patient profiles",
            "Team caregiver accounts",
            "Clinical activity reports",
            "API & EHR integrations",
            "Dedicated account manager",
            "SLA & compliance support",
        ],
    },
]

export default function PricingSection() {
    const navigate = useNavigate()
    const [yearly, setYearly] = useState(false)

    return (
        <section className="pricing-section" id="pricing">
            <div className="pricing-bg" />
            <div className="section-container">

                <div className="pricing-header">
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={0}
                        className="section-label"
                    >
                        💳 Simple pricing
                    </motion.div>
                    <motion.h2
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={1}
                        className="section-heading"
                    >
                        Transparent plans,<br />no surprises.
                    </motion.h2>
                    <motion.p
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={2}
                        className="section-subheading"
                    >
                        Start with a 14-day free trial. No credit card required.
                    </motion.p>

                    {/* Toggle */}
                    <motion.div
                        variants={fadeUp} initial="hidden" whileInView="visible"
                        viewport={{ once: true }} custom={3}
                        className="pricing-toggle"
                    >
                        <span className={!yearly ? "toggle-active" : ""}>Monthly</span>
                        <button
                            onClick={() => setYearly(!yearly)}
                            className={`toggle-btn ${yearly ? "yearly" : ""}`}
                        >
                            <motion.div
                                animate={{ x: yearly ? 20 : 0 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className="toggle-thumb"
                            />
                        </button>
                        <span className={yearly ? "toggle-active" : ""}>
                            Yearly <span className="toggle-save">Save 20%</span>
                        </span>
                    </motion.div>
                </div>

                <div className="pricing-grid">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            variants={scaleIn}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i}
                            whileHover={{ y: -4 }}
                            className={`pricing-card ${plan.highlight ? "highlighted" : ""}`}
                        >
                            {plan.badge && (
                                <div className="pricing-badge">{plan.badge}</div>
                            )}

                            <div className="pricing-card-top">
                                <h3 className="pricing-plan-name">{plan.name}</h3>
                                <p className="pricing-plan-desc">{plan.desc}</p>
                            </div>

                            <div className="pricing-price-row">
                                <span className="pricing-currency">$</span>
                                <motion.span
                                    key={yearly ? "yearly" : "monthly"}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pricing-amount"
                                >
                                    {yearly ? plan.price.yearly : plan.price.monthly}
                                </motion.span>
                                <span className="pricing-period">/mo</span>
                            </div>

                            {yearly && (
                                <p className="pricing-billed-note">
                                    Billed ${(plan.price.yearly * 12)} annually
                                </p>
                            )}

                            <ul className="pricing-features">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="pricing-feature-item">
                                        <span className="pricing-check">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/login")}
                                className={`pricing-cta-btn ${plan.highlight ? "primary" : "secondary"}`}
                            >
                                {plan.name === "Clinic" ? "Contact sales" : "Start free trial"}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}