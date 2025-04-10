import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Auth Components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';
import EmailConfirmation from './components/auth/EmailConfirmation';

// Admin Components
import AdminApproval from './components/admin/UserApproval';

// Main App Components
import Dashboard from './components/dashboard/Dashboard';
import Proposals from './components/proposals/Proposals';
import Contract from './components/contract/Contract';

// Layout Components
import AppLayout from './components/layout/AppLayout';

function App() {
  // Simple auth check (to be replaced with proper auth logic)
  const isAuthenticated = localStorage.getItem('token') !== null;
  const isAdmin = isAuthenticated && localStorage.getItem('role') === 'admin';

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/email-confirmation" element={<EmailConfirmation />} />

          {/* Admin Routes */}
          <Route 
            path="/admin/approvals" 
            element={isAdmin ? <AdminApproval /> : <Navigate to="/login" />} 
          />

          {/* Protected App Routes */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? 
              <AppLayout><Dashboard /></AppLayout> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/propostas" 
            element={isAuthenticated ? 
              <AppLayout><Proposals /></AppLayout> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/contratar" 
            element={isAuthenticated ? 
              <AppLayout><Contract /></AppLayout> : 
              <Navigate to="/login" />
            } 
          />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
