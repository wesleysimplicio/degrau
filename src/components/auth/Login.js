import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    try {
      // Mock login - replace with actual API call
      // const response = await loginApi(email, password);
      
      // Simulate successful login
      localStorage.setItem('token', 'dummy-token');
      localStorage.setItem('role', 'user');
      navigate('/dashboard');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>DEGRAU - Concessionárias</h2>
        <h3>Login</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">Entrar</button>
          
          <div className="auth-links">
            <Link to="/forgot-password">Esqueci minha senha</Link>
            <Link to="/register">Criar conta</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
