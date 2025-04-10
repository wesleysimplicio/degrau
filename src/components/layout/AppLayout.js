import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Layout.css';

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    // Clear local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // Redirect to login
    navigate('/login');
  };
  
  return (
    <div className="app-layout">
      <nav className="sidebar">
        <div className="logo">
          <h2>DEGRAU - Concessionárias</h2>
        </div>
        
        <ul className="menu">
          <li className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === '/propostas' ? 'active' : ''}>
            <Link to="/propostas">Propostas</Link>
          </li>
          <li className={location.pathname === '/contratar' ? 'active' : ''}>
            <Link to="/contratar">Contratar</Link>
          </li>
        </ul>
        
        <div className="user-section">
          <button onClick={handleLogout} className="btn-logout">
            Sair
          </button>
        </div>
      </nav>
      
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
