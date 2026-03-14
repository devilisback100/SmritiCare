import { motion } from "framer-motion"
import { useNavigate, useLocation } from "react-router-dom"

const patientLinks = [
    { icon: "🏠", label: "Home", path: "/patient/companion" },
    { icon: "📋", label: "Routine", path: "/patient/routine" },
    { icon: "🧠", label: "Exercises", path: "/patient/exercises" },
    { icon: "📖", label: "Journal", path: "/patient/journal" },
]

const caregiverLinks = [
    { icon: "📊", label: "Dashboard", path: "/caregiver/dashboard" },
    { icon: "🔔", label: "Alerts", path: "/caregiver/alerts" },
    { icon: "📍", label: "Location", path: "/caregiver/location" },
    { icon: "⚙️", label: "Settings", path: "/caregiver/settings" },
]

function getUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "{}")
    } catch {
        return {}
    }
}

export function PatientSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = getUser()

    return (
        <aside className="app-sidebar" style={{ backgroundColor: "#FDF9F5" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
                <div style={{
                    width: 36, height: 36, backgroundColor: "#5C3D22",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                </div>
                <span style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 20, fontWeight: 500, color: "#2E1B0E"
                }}>
                    Clara
                </span>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                {patientLinks.map(link => {
                    const active = location.pathname === link.path
                    return (
                        <motion.button
                            key={link.path}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(link.path)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "10px 14px", borderRadius: 10,
                                backgroundColor: active ? "#F0E8DC" : "transparent",
                                border: active ? "0.5px solid #E8D5B8" : "none",
                                cursor: "pointer", textAlign: "left",
                                color: active ? "#2E1B0E" : "#6B4C35",
                                fontSize: 14, fontWeight: active ? 500 : 400,
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{link.icon}</span>
                            {link.label}
                        </motion.button>
                    )
                })}
            </nav>

            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 14px", borderRadius: 10,
                backgroundColor: "#F0E8DC", border: "0.5px solid #E8D5B8",
                marginTop: "auto"
            }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: "linear-gradient(135deg, #C8874A, #8B5E3C)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16
                }}>
                    🧓
                </div>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#2E1B0E" }}>
                        {user?.name || "Patient"}
                    </p>
                    <p style={{ fontSize: 11, color: "#A08060" }}>
                        {user?.email || "Patient"}
                    </p>
                </div>
            </div>
        </aside>
    )
}

export function CaregiverSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = getUser()

    return (
        <aside className="app-sidebar dark">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
                <div style={{
                    width: 36, height: 36, backgroundColor: "#C8874A",
                    borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#FAF4ED" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                    </svg>
                </div>
                <span style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 20, fontWeight: 500, color: "#FAF4ED"
                }}>
                    Clara
                </span>
            </div>

            <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                {caregiverLinks.map(link => {
                    const active = location.pathname === link.path
                    return (
                        <motion.button
                            key={link.path}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate(link.path)}
                            style={{
                                display: "flex", alignItems: "center", gap: 12,
                                padding: "10px 14px", borderRadius: 10,
                                backgroundColor: active ? "#5C3D22" : "transparent",
                                border: active ? "0.5px solid #6B4C35" : "none",
                                cursor: "pointer", textAlign: "left",
                                color: active ? "#FAF4ED" : "#A08060",
                                fontSize: 14, fontWeight: active ? 500 : 400,
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{link.icon}</span>
                            {link.label}
                        </motion.button>
                    )
                })}
            </nav>

            <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 14px", borderRadius: 10,
                backgroundColor: "#5C3D22", border: "0.5px solid #6B4C35",
            }}>
                <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    backgroundColor: "#C8874A",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16
                }}>
                    👩‍⚕️
                </div>
                <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: "#FAF4ED" }}>
                        {user?.name || "Caregiver"}
                    </p>
                    <p style={{ fontSize: 11, color: "#A08060" }}>
                        {user?.email || "Caregiver"}
                    </p>
                </div>
            </div>
        </aside>
    )
}