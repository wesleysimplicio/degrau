import React, { useState, useEffect } from 'react';
import '../../styles/Proposals.css';

const Proposals = () => {
  const [filters, setFilters] = useState({
    date: '',
    status: ''
  });
  
  const [indicators, setIndicators] = useState({
    inputValue: 0,
    paid: 0,
    canceled: 0
  });
  
  const [proposals, setProposals] = useState([]);
  
  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchProposals = async () => {
      try {
        // Simulate API responses
        setIndicators({
          inputValue: 450000,
          paid: 320000,
          canceled: 30000
        });
        
        setProposals([
          { id: 'P001', customer: 'João Silva', value: 15000, status: 'Paga', date: '2023-05-15' },
          { id: 'P002', customer: 'Maria Santos', value: 12000, status: 'Pendente', date: '2023-05-16' },
          { id: 'P003', customer: 'Pedro Oliveira', value: 18000, status: 'Paga', date: '2023-05-15' },
          { id: 'P004', customer: 'Ana Costa', value: 9000, status: 'Cancelada', date: '2023-05-14' },
          { id: 'P005', customer: 'Lucas Ferreira', value: 21000, status: 'Pendente', date: '2023-05-17' },
        ]);
      } catch (err) {
        console.error('Error fetching proposals', err);
      }
    };
    
    fetchProposals();
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case 'Paga':
        return 'status-paid';
      case 'Pendente':
        return 'status-pending';
      case 'Cancelada':
        return 'status-canceled';
      default:
        return '';
    }
  };
  
  return (
    <div className="proposals-container">
      <h1>Propostas</h1>
      
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="date">Data</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={filters.date} 
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="filter-group">
          <label htmlFor="status">Situação</label>
          <select 
            id="status" 
            name="status" 
            value={filters.status} 
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            <option value="Paga">Pagas</option>
            <option value="Pendente">Pendentes</option>
            <option value="Cancelada">Canceladas</option>
          </select>
        </div>
      </div>
      
      <div className="indicators-section">
        <div className="indicator-card">
          <h3>Valor Digitado</h3>
          <p>R$ {indicators.inputValue.toLocaleString()}</p>
        </div>
        
        <div className="indicator-card">
          <h3>Pagas</h3>
          <p>R$ {indicators.paid.toLocaleString()}</p>
        </div>
        
        <div className="indicator-card">
          <h3>Canceladas</h3>
          <p>R$ {indicators.canceled.toLocaleString()}</p>
        </div>
      </div>
      
      <div className="table-section">
        <table className="proposals-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Cliente</th>
              <th>Valor</th>
              <th>Situação</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {proposals.length > 0 ? (
              proposals.map(proposal => (
                <tr key={proposal.id}>
                  <td>{proposal.id}</td>
                  <td>{proposal.customer}</td>
                  <td>R$ {proposal.value.toLocaleString()}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(proposal.status)}`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td>{new Date(proposal.date).toLocaleDateString('pt-BR')}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhuma proposta encontrada</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Proposals;
