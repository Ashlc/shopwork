import { Injectable } from '@nestjs/common';
import { IAddress, IUser } from 'src/interfaces/models';
import { IUserService } from 'src/interfaces/services';

@Injectable()
export class UserService implements IUserService {
  async createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser> {
    // Simulação de criação de usuário
    const user: IUser = {
      id: `user_${Date.now()}`,
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Usuário criado:', user.name);
    return user;
  }

  async getUserInfo(userId: string): Promise<IUser> {
    // Simulação de busca de usuário
    const user: IUser = {
      id: userId,
      name: 'João Silva',
      email: 'joao@email.com',
      dob: '1990-01-01',
      pfp: 'https://example.com/avatar.jpg',
      identificationNumber: '12345678901',
      phoneNumber: '+5511999999999',
      role: 'user',
      address: {
        id: 'addr_1',
        street: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567',
        country: 'Brasil',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Usuário encontrado:', user.name);
    return user;
  }

  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  deleteUser(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getAddress(userId: string): Promise<IAddress> {
    // Simulação de busca de endereço
    const address: IAddress = {
      id: 'addr_1',
      street: 'Rua das Flores, 123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567',
      country: 'Brasil',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    console.log('✅ Endereço encontrado para usuário:', userId);
    return address;
  }
}
