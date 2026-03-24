import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Home from './pages/Home';
import EventDetails from './pages/EventDetails';
import ParticipantDashboard from './pages/ParticipantDashboard';
import OrganizerDashboard from './pages/organizer/Dashboard';
import ManageEvent from './pages/organizer/ManageEvent';
import CreateEvent from './pages/organizer/CreateEvent';
import CreateEventPublic from './pages/CreateEventPublic';
import MyEvents from './pages/MyEvents';
import Login from './pages/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Placeholder Pages since they are not built yet
const Placeholder = ({ title }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h2>{title}</h2>
    <p>This page is under construction.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/login" element={<Login />} />
            
            {/* Redirect Root to Home */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            {/* Protected Routes with Main Navbar */}
            <Route element={<ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute>}>
              <Route path="/home" element={<Home />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/my-events" element={<ParticipantDashboard />} />
              <Route path="/create-event" element={<CreateEventPublic />} />
              <Route path="/my-created-events" element={<MyEvents />} />
            </Route>

            {/* Protected Organizer Routes with Sidebar */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Outlet /></DashboardLayout></ProtectedRoute>}>
              <Route index element={<OrganizerDashboard />} />
              <Route path="events" element={<ManageEvent />} />
              <Route path="create" element={<CreateEvent />} />
              <Route path="analytics" element={<Placeholder title="Analytics" />} />
              <Route path="settings" element={<Placeholder title="Settings" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
