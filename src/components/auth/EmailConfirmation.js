import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';

const EmailConfirmation = () => {
  const [message, setMessage] = useState('');

  const handleResendEmail = async () => {
    try {
      // Mock API call - replace with actual API
      // await resendConfirmationEmailApi();
      
      setMessage('E-mail de confirmação reenviado com sucesso!');
    } catch (err) {
      setMessage('Erro ao reenviar e-mail. Tente novamente.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>DEGRAU - Concessionárias</h2>
        <h3>Confirmação de E-mail</h3>
        
        <div className="confirmation-message">
          <p>Confirme seu e-mail para ativar sua conta.</p>
          <p>Um e-mail de confirmação foi enviado para seu endereço de e-mail cadastrado.</p>
        </div>
        
        {message && <div className="info-message">{message}</div>}
        
        <button onClick={handleResendEmail} className="btn-secondary">
          Reenviar e-mail de confirmação
        </button>
        
        <div className="auth-links">
          <Link to="/login">Voltar para login</Link>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
