import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    cpf: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (Object.values(formData).some(value => !value)) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }
    
    try {
      // Mock registration - replace with actual API call
      // const response = await registerApi(formData);
      
      // Simulate successful registration
      navigate('/email-confirmation');
    } catch (err) {
      setError('Falha no registro. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>DEGRAU - Concessionárias</h2>
        <h3>Criar Conta</h3>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Nome completo</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmação de senha</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn-primary">Criar Conta</button>
          
          <div className="auth-links">
            <p>Após o registro, um e-mail de confirmação será enviado.</p>
            <Link to="/login">Já tem uma conta? Faça login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
