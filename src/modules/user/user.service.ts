import { Injectable } from '@nestjs/common';
import { IAddress, IUser } from 'src/interfaces/models';
import { IUserService } from 'src/interfaces/services';

@Injectable()
export class UserService implements IUserService {
  createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  getUserInfo(userId: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    throw new Error('Method not implemented.');
  }

  deleteUser(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAddress(userId: string): Promise<IAddress> {
    throw new Error('Method not implemented.');
  }
}
