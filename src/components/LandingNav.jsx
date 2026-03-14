import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { isLoggedIn, getUser, logout } from "../utils/auth"
import "./LandingNav.css"

const CHATBOT_URL = "https://h3wl13rt-5000.inc1.devtunnels.ms/conversation"

const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
]

const ROLE_REDIRECT = {
    caregiver: "/caregiver/dashboard",
    patient: "/patient/companion",
}

function generateSessionId() {
    return "session_" + Math.random().toString(36).slice(2, 10)
}

export default function LandingNav() {
    const navigate = useNavigate()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [chatOpen, setChatOpen] = useState(false)
    const [messages, setMessages] = useState([
        { from: "bot", text: "Hi! I'm Clara 🌸 How can I help you today?" }
    ])
    const [input, setInput] = useState("")
    const [typing, setTyping] = useState(false)
    const [sessionId] = useState(generateSessionId)
    const profileRef = useRef(null)
    const chatEndRef = useRef(null)
    const inputRef = useRef(null)

    const loggedIn = isLoggedIn()
    const user = getUser()
    const dashPath = ROLE_REDIRECT[user?.role] || "/caregiver/dashboard"
    const userRole = user?.role || "patient"

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", fn)
        return () => window.removeEventListener("scroll", fn)
    }, [])

    useEffect(() => {
        const fn = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", fn)
        return () => document.removeEventListener("mousedown", fn)
    }, [])

    useEffect(() => {
        if (chatOpen) {
            setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
            setTimeout(() => inputRef.current?.focus(), 200)
        }
    }, [chatOpen, messages])

    const scrollTo = (href) => {
        setOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    }

    const sendMessage = async () => {
        const text = input.trim()
        if (!text || typing) return

        setMessages(prev => [...prev, { from: "user", text }])
        setInput("")
        setTyping(true)

        try {
            const res = await fetch(CHATBOT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    session_id: sessionId,
                    role: userRole,
                    message: text,
                }),
            })

            const data = await res.json()
            setMessages(prev => [...prev, { from: "bot", text: data.response }])
        } catch {
            setMessages(prev => [...prev, {
                from: "bot",
                text: "Sorry, I'm having trouble connecting right now. Please try again.",
                error: true,
            }])
        } finally {
            setTyping(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            sendMessage()
        }
    }

    const initials = user?.name
        ? user.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
        : "U"

    return (
        <>
            <motion.nav
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`ln-nav ${scrolled ? "ln-scrolled" : ""}`}
            >
                <div className="ln-inner">

                    {/* Logo */}
                    <button onClick={() => navigate("/")} className="ln-logo">
                        <div className="ln-logo-mark">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="#FAF4ED" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                <circle cx="12" cy="9" r="2.5" />
                            </svg>
                        </div>
                        <span className="ln-logo-text">SmritiCare</span>
                    </button>

                    {/* Desktop links */}
                    <div className="ln-links">
                        {links.map(l => (
                            <button key={l.label} onClick={() => scrollTo(l.href)} className="ln-link">
                                {l.label}
                            </button>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="ln-cta">

                        {/* Chat button */}
                        <motion.button
                            whileHover={{ y: -1 }} whileTap={{ scale: 0.95 }}
                            onClick={() => setChatOpen(true)}
                            className="ln-chat-btn"
                            title="Chat with Clara"
                        >
                            <span className="ln-chat-dot" />
                            💬 Ask Clara
                        </motion.button>

                        {loggedIn ? (
                            <div className="ln-profile-wrap" ref={profileRef}>
                                <motion.button
                                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => setProfileOpen(p => !p)}
                                    className="ln-profile-btn"
                                >
                                    <div className="ln-avatar">{initials}</div>
                                    <span className="ln-profile-name">{user?.name || "Profile"}</span>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        style={{ transform: profileOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </motion.button>

                                <AnimatePresence>
                                    {profileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                            transition={{ duration: 0.15 }}
                                            className="ln-dropdown"
                                        >
                                            <div className="ln-dropdown-header">
                                                <p className="ln-dropdown-name">{user?.name}</p>
                                                <p className="ln-dropdown-email">{user?.email}</p>
                                                <span className="ln-dropdown-role">{user?.role || "user"}</span>
                                            </div>
                                            <div className="ln-dropdown-divider" />
                                            <button onClick={() => { setProfileOpen(false); navigate(dashPath) }} className="ln-dropdown-item">
                                                <span>📊</span> Dashboard
                                            </button>
                                            <div className="ln-dropdown-divider" />
                                            <button onClick={() => { setProfileOpen(false); logout() }} className="ln-dropdown-item ln-dropdown-logout">
                                                <span>🚪</span> Sign out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <>
                                <motion.button
                                    whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/login")}
                                    className="ln-signin"
                                >
                                    Sign in
                                </motion.button>
                                <motion.button
                                    whileHover={{ y: -1, boxShadow: "0 4px 16px #5C3D2240" }}
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => navigate("/register")}
                                    className="ln-getstarted"
                                >
                                    Get started
                                </motion.button>
                            </>
                        )}
                    </div>

                    {/* Hamburger */}
                    <button onClick={() => setOpen(o => !o)} className="ln-hamburger" aria-label="Menu">
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                        <span className={`ln-ham ${open ? "open" : ""}`} />
                    </button>
                </div>
            </motion.nav>

            {/* ── Chatbot ── */}
            <AnimatePresence>
                {chatOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="chat-backdrop"
                            onClick={() => setChatOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 24, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 24, scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                            className="chat-window"
                        >
                            {/* Header */}
                            <div className="chat-header">
                                <div className="chat-header-avatar">🌸</div>
                                <div>
                                    <p className="chat-header-name">Clara</p>
                                    <p className="chat-header-status">
                                        <span className="chat-online-dot" /> Online
                                    </p>
                                </div>
                                <button onClick={() => setChatOpen(false)} className="chat-close">✕</button>
                            </div>

                            {/* Messages */}
                            <div className="chat-messages">
                                {messages.map((msg, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className={`chat-msg ${msg.from === "user" ? "chat-msg-user" : "chat-msg-bot"}`}
                                    >
                                        {msg.from === "bot" && (
                                            <div className="chat-bot-avatar">🌸</div>
                                        )}
                                        <div className={`chat-bubble ${msg.error ? "chat-bubble-error" : ""}`}>
                                            {msg.text}
                                        </div>
                                    </motion.div>
                                ))}

                                {typing && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="chat-msg chat-msg-bot"
                                    >
                                        <div className="chat-bot-avatar">🌸</div>
                                        <div className="chat-bubble chat-typing">
                                            <span /><span /><span />
                                        </div>
                                    </motion.div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input */}
                            <div className="chat-input-row">
                                <textarea
                                    ref={inputRef}
                                    className="chat-input"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    rows={1}
                                />
                                <motion.button
                                    whileTap={{ scale: 0.92 }}
                                    onClick={sendMessage}
                                    disabled={!input.trim() || typing}
                                    className="chat-send-btn"
                                >
                                    →
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating chat bubble (when closed) */}
            <AnimatePresence>
                {!chatOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.08, y: -2 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => setChatOpen(true)}
                        className="chat-fab"
                    >
                        <span style={{ fontSize: 22 }}>💬</span>
                        <span className="chat-fab-dot" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Mobile drawer */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="ln-backdrop"
                            onClick={() => setOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="ln-mobile-drawer"
                        >
                            <div className="ln-mobile-header">
                                <div className="ln-logo-mark" style={{ width: 32, height: 32 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="#FAF4ED" strokeWidth="2.5" strokeLinecap="round">
                                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                                        <circle cx="12" cy="9" r="2.5" />
                                    </svg>
                                </div>
                                <span className="ln-logo-text">SmritiCare</span>
                                <button onClick={() => setOpen(false)} className="ln-close-btn">✕</button>
                            </div>

                            {loggedIn && (
                                <div className="ln-mobile-profile">
                                    <div className="ln-avatar ln-avatar-lg">{initials}</div>
                                    <div>
                                        <p className="ln-mobile-profile-name">{user?.name}</p>
                                        <p className="ln-mobile-profile-email">{user?.email}</p>
                                    </div>
                                </div>
                            )}

                            <nav className="ln-mobile-links">
                                {links.map((l, i) => (
                                    <motion.button
                                        key={l.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => scrollTo(l.href)}
                                        className="ln-mobile-link"
                                    >
                                        {l.label}
                                        <span className="ln-mobile-arrow">→</span>
                                    </motion.button>
                                ))}
                                <motion.button
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: links.length * 0.05 }}
                                    onClick={() => { setOpen(false); setChatOpen(true) }}
                                    className="ln-mobile-link"
                                >
                                    💬 Ask Clara
                                    <span className="ln-mobile-arrow">→</span>
                                </motion.button>
                            </nav>

                            <div className="ln-mobile-divider" />

                            <div className="ln-mobile-actions">
                                {loggedIn ? (
                                    <>
                                        <button onClick={() => { setOpen(false); navigate(dashPath) }} className="ln-mobile-primary">
                                            📊 Go to Dashboard
                                        </button>
                                        <button onClick={() => { setOpen(false); logout() }} className="ln-mobile-secondary">
                                            🚪 Sign out
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => { setOpen(false); navigate("/register") }} className="ln-mobile-primary">
                                            Get started free
                                        </button>
                                        <button onClick={() => { setOpen(false); navigate("/login") }} className="ln-mobile-secondary">
                                            Sign in
                                        </button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}