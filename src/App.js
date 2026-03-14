import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Register from "./pages/auth/Register"

import LandingPage from "./pages/landing/LandingPage"
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

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/register" element={<Register />} />

        <Route path="/patient">
          <Route path="companion" element={<CompanionScreen />} />
          <Route path="routine" element={<DailyRoutine />} />
          <Route path="exercises" element={<CognitiveExercises />} />
        </Route>

        <Route path="/caregiver">
          <Route path="dashboard" element={<CaregiverDashboard />} />
          <Route path="alerts" element={<AlertsNotifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}