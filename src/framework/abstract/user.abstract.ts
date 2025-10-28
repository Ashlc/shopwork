import { IAddress, IUser } from 'src/interfaces/models';

abstract class BaseUserService {
  abstract createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser>;

  abstract getUserInfo(userId: string): Promise<IUser>;

  abstract updateUser(userId: string, userData: Partial<IUser>): Promise<IUser>;

  abstract deleteUser(userId: string): Promise<void>;

  abstract getAddress(userId: string): Promise<IAddress>;
}

export default BaseUserService;
