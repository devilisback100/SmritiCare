import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import "./Footer.css"

const LINKS = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Support: ["Help centre", "Contact", "Privacy policy", "Terms"],
}

export default function Footer() {
    const navigate = useNavigate()

    return (
        <footer className="footer">
            <div className="footer-inner section-container">

                <div className="footer-brand">
                    <button onClick={() => navigate("/")} className="footer-logo">
                        <div className="footer-logo-dot">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        <span className="footer-logo-text">Clara</span>
                    </button>
                    <p className="footer-tagline">
                        AI-powered memory care companion for patients and caregivers.
                    </p>
                    <div className="footer-socials">
                        {["𝕏", "in", "▶"].map(s => (
                            <motion.button
                                key={s} whileHover={{ y: -2 }} whileTap={{ scale: 0.9 }}
                                className="footer-social-btn"
                            >
                                {s}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div className="footer-links">
                    {Object.entries(LINKS).map(([section, links]) => (
                        <div key={section} className="footer-link-group">
                            <h4 className="footer-link-heading">{section}</h4>
                            <ul className="footer-link-list">
                                {links.map(link => (
                                    <li key={link}>
                                        <motion.button
                                            whileHover={{ x: 2 }}
                                            className="footer-link"
                                        >
                                            {link}
                                        </motion.button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-bottom section-container">
                <p className="footer-copy">© 2025 Clara. All rights reserved.</p>
                <p className="footer-copy">Made with ❤️ in Bengaluru</p>
            </div>
        </footer>
    )
}