import { fileService } from './fileService';

export interface ContractRequest {
  bank: string;
  cpf: string;
}

export interface ContractResponse {
  name: string;
  status: 'Aprovado' | 'Pendente' | 'Recusado';
  availableBalance: number;
  riskScore: 'Baixo' | 'Médio' | 'Alto';
}

export interface Contract {
  id: string;
  bank: string;
  cpf: string;
  userId: string;
  name: string;
  status: 'Aprovado' | 'Pendente' | 'Recusado';
  availableBalance: number;
  riskScore: 'Baixo' | 'Médio' | 'Alto';
  createdAt: string;
}

export const contractService = {
  /**
   * Check balance for a contract request
   */
  checkBalance: async (request: ContractRequest): Promise<ContractResponse> => {
    // In a real app, this would call a banking API
    // For demo purposes, we'll simulate a response
    
    // Get existing customers or create empty array
    const customers = await fileService.readJsonFile<any[]>('customers');
    
    // Find customer by CPF (only numbers)
    const cpfNumbers = request.cpf.replace(/\D/g, '');
    const customer = customers.find(c => c.cpf.replace(/\D/g, '') === cpfNumbers);
    
    if (customer) {
      // Return customer data
      return {
        name: customer.name,
        status: 'Aprovado',
        availableBalance: customer.availableBalance || 25000,
        riskScore: customer.riskScore || 'Baixo'
      };
    }
    
    // Simulate based on CPF last digit
    const lastDigit = parseInt(cpfNumbers.charAt(cpfNumbers.length - 1));
    
    // Get a random score based on CPF
    const riskScores = ['Baixo', 'Médio', 'Alto'] as const;
    const riskScore = riskScores[lastDigit % 3];
    
    // Generate a name
    const firstNames = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Fernanda', 'Lucas', 'Juliana'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Ferreira', 'Pereira', 'Costa'];
    
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    // Generate a balance based on risk score
    let availableBalance;
    if (riskScore === 'Baixo') {
      availableBalance = 20000 + Math.floor(Math.random() * 10000);
    } else if (riskScore === 'Médio') {
      availableBalance = 10000 + Math.floor(Math.random() * 10000);
    } else {
      availableBalance = 5000 + Math.floor(Math.random() * 5000);
    }
    
    // Store customer for future requests
    const newCustomer = {
      cpf: request.cpf,
      name: `${randomFirstName} ${randomLastName}`,
      availableBalance,
      riskScore
    };
    
    customers.push(newCustomer);
    await fileService.writeJsonFile('customers', customers);
    
    return {
      name: newCustomer.name,
      status: 'Aprovado',
      availableBalance,
      riskScore
    };
  },
  
  /**
   * Create a new contract
   */
  createContract: async (contractData: ContractRequest & { userId: string }): Promise<Contract> => {
    // Check balance first
    const response = await this.checkBalance(contractData);
    
    // Get existing contracts
    const contracts = await fileService.readJsonFile<Contract[]>('contracts');
    
    // Create new contract
    const newContract: Contract = {
      id: fileService.generateId(),
      bank: contractData.bank,
      cpf: contractData.cpf,
      userId: contractData.userId,
      name: response.name,
      status: response.status,
      availableBalance: response.availableBalance,
      riskScore: response.riskScore,
      createdAt: new Date().toISOString()
    };
    
    // Add to contracts and save
    contracts.push(newContract);
    await fileService.writeJsonFile('contracts', contracts);
    
    return newContract;
  },
  
  /**
   * Get all contracts for a user
   */
  getUserContracts: async (userId: string): Promise<Contract[]> => {
    const contracts = await fileService.readJsonFile<Contract[]>('contracts');
    
    // Filter by userId
    return contracts.filter(contract => contract.userId === userId);
  }
};
