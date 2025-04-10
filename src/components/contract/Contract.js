import React, { useState } from 'react';
import '../../styles/Contract.css';

const Contract = () => {
  const [bank, setBank] = useState('');
  const [cpf, setCpf] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleBankChange = (e) => {
    setBank(e.target.value);
  };
  
  const handleCpfChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    
    // Format CPF as user types
    let formattedCpf = '';
    if (value.length <= 3) {
      formattedCpf = value;
    } else if (value.length <= 6) {
      formattedCpf = `${value.slice(0, 3)}.${value.slice(3)}`;
    } else if (value.length <= 9) {
      formattedCpf = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else {
      formattedCpf = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
    }
    
    setCpf(formattedCpf);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bank) {
      setError('Selecione uma bancarizadora');
      return;
    }
    
    if (!cpf || cpf.replace(/\D/g, '').length !== 11) {
      setError('CPF inválido');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      // Mock API call - replace with actual API
      // const response = await checkBalanceApi(bank, cpf);
      
      // Simulate API response
      setTimeout(() => {
        setResponse({
          name: 'João da Silva',
          status: 'Aprovado',
          availableBalance: 25000,
          riskScore: 'Baixo'
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Erro ao consultar saldo. Tente novamente.');
      setLoading(false);
    }
  };
  
  return (
    <div className="contract-container">
      <h1>Contratar</h1>
      
      <div className="contract-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Bancarizadora</h3>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="bank"
                  value="BMP"
                  checked={bank === 'BMP'}
                  onChange={handleBankChange}
                />
                <span>BMP</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="bank"
                  value="QI Tech"
                  checked={bank === 'QI Tech'}
                  onChange={handleBankChange}
                />
                <span>QI Tech</span>
              </label>
            </div>
          </div>
          
          <div className="form-section">
            <h3>Consulta</h3>
            <div className="form-group">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength={14}
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Consultando...' : 'Consultar saldo'}
            </button>
          </div>
        </form>
        
        {response && (
          <div className="response-section">
            <h3>Resultado da Consulta</h3>
            
            <div className="response-details">
              <div className="detail-group">
                <span className="detail-label">Nome:</span>
                <span className="detail-value">{response.name}</span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Status:</span>
                <span className={`detail-value status-${response.status.toLowerCase()}`}>
                  {response.status}
                </span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Saldo Disponível:</span>
                <span className="detail-value highlight">
                  R$ {response.availableBalance.toLocaleString()}
                </span>
              </div>
              
              <div className="detail-group">
                <span className="detail-label">Score de Risco:</span>
                <span className="detail-value">{response.riskScore}</span>
              </div>
            </div>
            
            <button className="btn-secondary">
              Prosseguir com contratação
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contract;
