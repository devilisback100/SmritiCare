import { BrowserRouter, Routes, Route } from "react-router-dom"

import LoginRoleSelect from "./pages/auth/LoginRoleSelect"
import CompanionScreen from "./pages/patient/CompanionScreen"
import DailyRoutine from "./pages/patient/DailyRoutine"
import CognitiveExercises from "./pages/patient/CognitiveExercises"
import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard"
import AlertsNotifications from "./pages/caregiver/AlertsNotifications"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginRoleSelect />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/patient/companion" element={<CompanionScreen />} />
        <Route path="/patient/routine" element={<DailyRoutine />} />
        <Route path="/patient/exercises" element={<CognitiveExercises />} />
        <Route path="/caregiver/dashboard" element={<CaregiverDashboard />} />
        <Route path="/caregiver/alerts" element={<AlertsNotifications />} />
        {/* catch-all goes to login, not redirect */}
      </Routes>
    </BrowserRouter>
  )
}