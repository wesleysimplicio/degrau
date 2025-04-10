import React, { useState, useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import '../../styles/Dashboard.css';

// Registrando os componentes do Chart.js
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Dashboard = () => {
  const [filters, setFilters] = useState({
    store: '',
    operator: '',
    date: ''
  });
  
  const [metrics, setMetrics] = useState({
    paid: 0,
    target: 0,
    offeredBalance: 0,
    inputBalance: 0,
    consumedBalance: 0
  });
  
  const [dailyStats, setDailyStats] = useState([]);
  const [operatorStats, setOperatorStats] = useState([]);
  
  const [summaryData, setSummaryData] = useState({
    totalProposals: 0,
    approvedProposals: 0,
    pendingProposals: 0,
    rejectedProposals: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);
  const [monthlyPerformance, setMonthlyPerformance] = useState([]);
  
  useEffect(() => {
    // Mock API call - replace with actual API
    const fetchDashboardData = async () => {
      try {
        // Simulate API responses
        setMetrics({
          paid: 150000,
          target: 200000,
          offeredBalance: 300000,
          inputBalance: 250000,
          consumedBalance: 180000
        });
        
        setDailyStats([
          { day: '01/05', amount: 12000 },
          { day: '02/05', amount: 15000 },
          { day: '03/05', amount: 10000 },
          { day: '04/05', amount: 18000 },
          { day: '05/05', amount: 22000 },
          { day: '06/05', amount: 19000 },
          { day: '07/05', amount: 24000 },
        ]);
        
        setOperatorStats([
          { name: 'João', amount: 45000 },
          { name: 'Maria', amount: 38000 },
          { name: 'Pedro', amount: 32000 },
          { name: 'Ana', amount: 35000 },
        ]);

        setSummaryData({
          totalProposals: 120,
          approvedProposals: 85,
          pendingProposals: 25,
          rejectedProposals: 10
        });
        
        setMonthlyPerformance([
          { month: 'Jan', value: 120000 },
          { month: 'Fev', value: 140000 },
          { month: 'Mar', value: 160000 },
          { month: 'Abr', value: 130000 },
          { month: 'Mai', value: 150000 },
          { month: 'Jun', value: 180000 },
        ]);
        
        setRecentActivity([
          { id: 1, time: '2023-05-17T14:30:00', description: 'Proposta #P005 foi criada' },
          { id: 2, time: '2023-05-17T13:15:00', description: 'Proposta #P004 foi aprovada' },
          { id: 3, time: '2023-05-17T11:45:00', description: 'Proposta #P003 foi atualizada' },
          { id: 4, time: '2023-05-17T10:20:00', description: 'Proposta #P002 foi enviada para análise' },
          { id: 5, time: '2023-05-17T09:05:00', description: 'Proposta #P001 foi aprovada' },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      }
    };
    
    fetchDashboardData();
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const formatDate = (dateString) => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };
  
  // Dados para o gráfico de pizza de status de propostas
  const proposalStatusData = {
    labels: ['Aprovadas', 'Pendentes', 'Rejeitadas'],
    datasets: [
      {
        label: 'Propostas por status',
        data: [summaryData.approvedProposals, summaryData.pendingProposals, summaryData.rejectedProposals],
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 99, 132, 0.7)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Dados para o gráfico de barras diário
  const dailyChartData = {
    labels: dailyStats.map(stat => stat.day),
    datasets: [
      {
        label: 'R$ Pago por dia',
        data: dailyStats.map(stat => stat.amount),
        backgroundColor: 'rgba(75, 192, 192, 0.7)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Dados para o gráfico de operadores
  const operatorChartData = {
    labels: operatorStats.map(stat => stat.name),
    datasets: [
      {
        label: 'R$ Pago por operador',
        data: operatorStats.map(stat => stat.amount),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };
  
  // Dados para o gráfico de desempenho mensal
  const monthlyChartData = {
    labels: monthlyPerformance.map(data => data.month),
    datasets: [
      {
        label: 'Desempenho Mensal (R$)',
        data: monthlyPerformance.map(data => data.value),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4,
      },
    ],
  };
  
  // Opções comuns dos gráficos
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
            } else if (context.parsed !== undefined) {
              label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
  };
  
  const lineChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
          }
        }
      }
    }
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        
        <div className="filters-section">
          <div className="filter-group">
            <label htmlFor="store">Loja</label>
            <select 
              id="store" 
              name="store" 
              value={filters.store} 
              onChange={handleFilterChange}
            >
              <option value="">Todas</option>
              <option value="1">Loja 1</option>
              <option value="2">Loja 2</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="operator">Operador</label>
            <select 
              id="operator" 
              name="operator" 
              value={filters.operator} 
              onChange={handleFilterChange}
            >
              <option value="">Todos</option>
              <option value="1">João</option>
              <option value="2">Maria</option>
              <option value="3">Pedro</option>
              <option value="4">Ana</option>
            </select>
          </div>
          
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
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="metrics-section">
          <div className="metric-card primary">
            <h3>R$ Pago x Meta</h3>
            <div className="progress-container">
              <div 
                className="progress-bar" 
                style={{ width: `${(metrics.paid / metrics.target) * 100}%` }}
              ></div>
              <div className="progress-label">{Math.round((metrics.paid / metrics.target) * 100)}%</div>
            </div>
            <div className="metric-values">
              <span>R$ {metrics.paid.toLocaleString('pt-BR')}</span>
              <span>R$ {metrics.target.toLocaleString('pt-BR')}</span>
            </div>
          </div>
          
          <div className="metrics-row">
            <div className="metric-card">
              <h3>Saldo Ofertado</h3>
              <p>R$ {metrics.offeredBalance.toLocaleString('pt-BR')}</p>
              <div className="metric-icon offered-icon"></div>
            </div>
            
            <div className="metric-card">
              <h3>Saldo Digitado</h3>
              <p>R$ {metrics.inputBalance.toLocaleString('pt-BR')}</p>
              <div className="metric-icon input-icon"></div>
            </div>
            
            <div className="metric-card">
              <h3>Saldo Consumido</h3>
              <p>R$ {metrics.consumedBalance.toLocaleString('pt-BR')}</p>
              <div className="metric-icon consumed-icon"></div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          <div className="dashboard-summary">
            <div className="summary-card">
              <h3>Total de Propostas</h3>
              <p>{summaryData.totalProposals}</p>
              <div className="card-icon total-icon"></div>
            </div>
            
            <div className="summary-card success">
              <h3>Aprovadas</h3>
              <p>{summaryData.approvedProposals}</p>
              <div className="card-icon approved-icon"></div>
            </div>
            
            <div className="summary-card primary">
              <h3>Pendentes</h3>
              <p>{summaryData.pendingProposals}</p>
              <div className="card-icon pending-icon"></div>
            </div>
            
            <div className="summary-card danger">
              <h3>Rejeitadas</h3>
              <p>{summaryData.rejectedProposals}</p>
              <div className="card-icon rejected-icon"></div>
            </div>
          </div>
          
          <div className="charts-section">
            <div className="chart-card">
              <h3>R$ Pago por dia</h3>
              <div className="chart-container">
                <Bar data={dailyChartData} options={chartOptions} />
              </div>
            </div>
            
            <div className="chart-card">
              <h3>R$ Pago por operador</h3>
              <div className="chart-container">
                <Bar data={operatorChartData} options={chartOptions} />
              </div>
            </div>
          </div>
          
          <div className="dashboard-charts">
            <div className="chart-container pie-chart">
              <h3>Propostas por Status</h3>
              <div className="pie-chart-wrapper">
                <Pie data={proposalStatusData} options={chartOptions} />
              </div>
            </div>
            
            <div className="chart-container line-chart">
              <h3>Desempenho Mensal</h3>
              <div className="line-chart-wrapper">
                <Line data={monthlyChartData} options={lineChartOptions} />
              </div>
            </div>
          </div>
          
          <div className="recent-activity">
            <h3>Atividade Recente</h3>
            
            <ul className="activity-list">
              {recentActivity.length > 0 ? (
                recentActivity.map(activity => (
                  <li key={activity.id} className="activity-item">
                    <div className="activity-time">{formatDate(activity.time)}</div>
                    <div className="activity-description">{activity.description}</div>
                  </li>
                ))
              ) : (
                <li className="activity-item">Nenhuma atividade recente</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
