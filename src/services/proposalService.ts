import { fileService } from './fileService';

export interface Proposal {
  id: string;
  customer: string;
  value: number;
  status: 'Paga' | 'Pendente' | 'Cancelada';
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProposalFilters {
  date?: string;
  status?: string;
  userId?: string;
}

export interface ProposalIndicators {
  inputValue: number;
  paid: number;
  canceled: number;
}

export const proposalService = {
  /**
   * Get all proposals with optional filters
   */
  getProposals: async (filters?: ProposalFilters): Promise<Proposal[]> => {
    let proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Apply filters
    if (filters) {
      if (filters.date) {
        proposals = proposals.filter(proposal => 
          proposal.date.substring(0, 10) === filters.date.substring(0, 10)
        );
      }
      
      if (filters.status) {
        proposals = proposals.filter(proposal => 
          proposal.status === filters.status
        );
      }
      
      if (filters.userId) {
        proposals = proposals.filter(proposal => 
          proposal.userId === filters.userId
        );
      }
    }
    
    return proposals;
  },
  
  /**
   * Get proposal indicators
   */
  getProposalIndicators: async (userId?: string): Promise<ProposalIndicators> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Filter by user if userId is provided
    const filteredProposals = userId 
      ? proposals.filter(proposal => proposal.userId === userId)
      : proposals;
    
    // Calculate indicators
    const inputValue = filteredProposals.reduce((sum, proposal) => sum + proposal.value, 0);
    const paid = filteredProposals
      .filter(proposal => proposal.status === 'Paga')
      .reduce((sum, proposal) => sum + proposal.value, 0);
    const canceled = filteredProposals
      .filter(proposal => proposal.status === 'Cancelada')
      .reduce((sum, proposal) => sum + proposal.value, 0);
    
    return {
      inputValue,
      paid,
      canceled
    };
  },
  
  /**
   * Create a new proposal
   */
  createProposal: async (proposalData: Omit<Proposal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Proposal> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Create new proposal
    const newProposal: Proposal = {
      ...proposalData,
      id: `P${String(proposals.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to proposals and save
    proposals.push(newProposal);
    await fileService.writeJsonFile('proposals', proposals);
    
    return newProposal;
  },
  
  /**
   * Update a proposal
   */
  updateProposal: async (id: string, proposalData: Partial<Proposal>): Promise<Proposal> => {
    const proposals = await fileService.readJsonFile<Proposal[]>('proposals');
    
    // Find proposal
    const index = proposals.findIndex(proposal => proposal.id === id);
    if (index === -1) {
      throw new Error('Proposal not found');
    }
    
    // Update proposal
    proposals[index] = {
      ...proposals[index],
      ...proposalData,
      updatedAt: new Date().toISOString()
    };
    
    // Save changes
    await fileService.writeJsonFile('proposals', proposals);
    
    return proposals[index];
  }
};
