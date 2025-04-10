import { User, LoginCredentials, LoginResponse, RegisterData } from '../models/authModels';
import { fileService } from './fileService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Secret key for JWT (in a real app, this would be in an environment variable)
const JWT_SECRET = 'your-secret-key';

export const authService = {
  /**
   * Register a new user
   */
  register: async (userData: RegisterData): Promise<User> => {
    // Read existing users
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Check if user already exists
    const existingUser = users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Create new user
    const newUser: User = {
      id: fileService.generateId(),
      fullName: userData.fullName,
      email: userData.email,
      cpf: userData.cpf,
      password: hashedPassword,
      role: 'user',
      status: 'pending', // New users need approval
      createdAt: new Date().toISOString()
    };
    
    // Add to users array and save
    users.push(newUser);
    await fileService.writeJsonFile('users', users);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },

  /**
   * Login user and get auth token
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    // Read users
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Find user by email
    const user = users.find(user => user.email === credentials.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Check password
    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }
    
    // Check if user is approved
    if (user.status !== 'approved') {
      throw new Error('Account not yet approved by administrator');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    // Return token and user info (without password)
    const { password, ...userWithoutPassword } = user;
    return {
      token,
      user: userWithoutPassword as User
    };
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    // In a token-based auth system with local storage,
    // we just remove the token from the client side
    localStorage.removeItem('auth_token');
  },

  /**
   * Get current user profile
   */
  getCurrentUser: async (token: string): Promise<User> => {
    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      
      // Read users
      const users = await fileService.readJsonFile<User[]>('users');
      
      // Find user by id
      const user = users.find(user => user.id === decoded.id);
      if (!user) {
        throw new Error('User not found');
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    } catch (error) {
      throw new Error('Invalid token');
    }
  },

  /**
   * Request password reset
   */
  requestPasswordReset: async (email: string): Promise<void> => {
    const users = await fileService.readJsonFile<User[]>('users');
    
    // Find user by email
    const user = users.find(user => user.email === email);
    if (!user) {
      // Don't reveal if user exists or not
      return;
    }
    
    // Generate reset token
    const resetToken = fileService.generateId();
    const resetExpires = new Date();
    resetExpires.setHours(resetExpires.getHours() + 1); // Token valid for 1 hour
    
    // Update user with reset token
    user.resetToken = resetToken;
    user.resetTokenExpires = resetExpires.toISOString();
    
    // Save updated users
    await fileService.writeJsonFile('users', users);
    
    // In a real app, you would send an email with the reset link
    console.log(`Reset token for ${email}: ${resetToken}`);
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  }
};
