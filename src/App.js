import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import LandingPage from "./pages/landing/LandingPage"
import LoginRoleSelect from "./pages/auth/LoginRoleSelect"
import Register from "./pages/auth/Register"

import CompanionScreen from "./pages/patient/CompanionScreen"
import DailyRoutine from "./pages/patient/DailyRoutine"
import CognitiveExercises from "./pages/patient/CognitiveExercises"

import CaregiverDashboard from "./pages/caregiver/CaregiverDashboard"
import AlertsNotifications from "./pages/caregiver/AlertsNotifications"

import ProtectedRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginRoleSelect />} />
        <Route path="/register" element={<Register />} />

        <Route path="/patient">
          <Route path="companion" element={
            <ProtectedRoute><CompanionScreen /></ProtectedRoute>
          } />
          <Route path="routine" element={
            <ProtectedRoute><DailyRoutine /></ProtectedRoute>
          } />
          <Route path="exercises" element={
            <ProtectedRoute><CognitiveExercises /></ProtectedRoute>
          } />
        </Route>

        <Route path="/caregiver">
          <Route path="dashboard" element={
            <ProtectedRoute><CaregiverDashboard /></ProtectedRoute>
          } />
          <Route path="alerts" element={
            <ProtectedRoute><AlertsNotifications /></ProtectedRoute>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  )
}