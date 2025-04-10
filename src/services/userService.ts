import { User } from '../models/authModels';
import { fileService } from './fileService';

export const userService = {
  /**
   * Get all users
   */
  getAllUsers: async (): Promise<User[]> => {
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Remove passwords before returning
    return users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    });
  },
  
  /**
   * Get users pending approval
   */
  getPendingUsers: async (): Promise<User[]> => {
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Filter users with 'pending' status and remove passwords
    return users
      .filter(user => user.status === 'pending')
      .map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword as User;
      });
  },
  
  /**
   * Approve or reject a user
   */
  updateUserStatus: async (userId: string, status: 'approved' | 'rejected'): Promise<User> => {
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Find user by id
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    // Update user status
    users[userIndex].status = status;
    
    // Save changes
    await fileService.writeJsonFile('users', users);
    
    // Return updated user without password
    const { password, ...userWithoutPassword } = users[userIndex];
    return userWithoutPassword as User;
  }
};
