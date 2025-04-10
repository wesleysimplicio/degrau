import React, { useState, useEffect } from 'react';
import '../../styles/Admin.css';

const UserApproval = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchPendingUsers = async () => {
      try {
        // const response = await getPendingUsersApi();
        // Simulate API response
        const mockUsers = [
          { id: 1, name: 'João Silva', email: 'joao@example.com', cpf: '123.456.789-00', registrationDate: '2023-05-15' },
          { id: 2, name: 'Maria Santos', email: 'maria@example.com', cpf: '987.654.321-00', registrationDate: '2023-05-16' },
          { id: 3, name: 'Pedro Oliveira', email: 'pedro@example.com', cpf: '456.789.123-00', registrationDate: '2023-05-17' },
        ];
        setPendingUsers(mockUsers);
      } catch (err) {
        setMessage('Erro ao carregar usuários pendentes');
      }
    };

    fetchPendingUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      // Mock API call - replace with actual API
      // await approveUserApi(userId);
      
      // Update UI
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      setMessage('Usuário aprovado com sucesso');
    } catch (err) {
      setMessage('Erro ao aprovar usuário');
    }
  };

  const handleReject = async (userId) => {
    try {
      // Mock API call - replace with actual API
      // await rejectUserApi(userId);
      
      // Update UI
      setPendingUsers(pendingUsers.filter(user => user.id !== userId));
      setMessage('Usuário rejeitado com sucesso');
    } catch (err) {
      setMessage('Erro ao rejeitar usuário');
    }
  };

  return (
    <div className="admin-container">
      <h2>Aprovação de Registros</h2>
      
      {message && <div className="info-message">{message}</div>}
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Data do registro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.length > 0 ? (
              pendingUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.cpf}</td>
                  <td>{user.registrationDate}</td>
                  <td className="action-buttons">
                    <button 
                      className="btn-approve" 
                      onClick={() => handleApprove(user.id)}
                    >
                      Aprovar
                    </button>
                    <button 
                      className="btn-reject" 
                      onClick={() => handleReject(user.id)}
                    >
                      Rejeitar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Nenhum registro pendente</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserApproval;
