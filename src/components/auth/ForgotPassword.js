import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Por favor, informe seu e-mail');
      return;
    }
    
    try {
      // Mock API call - replace with actual API
      // await resetPasswordApi(email);
      
      setMessage('Se o e-mail existir, enviaremos um link para redefinir a senha.');
      setIsSubmitted(true);
    } catch (err) {
      setMessage('Ocorreu um erro. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>DEGRAU - Concessionárias</h2>
        <h3>Esqueci minha senha</h3>
        
        {message && <div className={isSubmitted ? "success-message" : "error-message"}>{message}</div>}
        
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
          
          <button type="submit" className="btn-primary">Enviar instruções</button>
          
          <div className="auth-links">
            <Link to="/login">Voltar para login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
