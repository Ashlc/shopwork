import { IUser } from 'src/interfaces/models';
import { IUserService } from 'src/interfaces/services';

abstract class UserService implements IUserService {
  abstract createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser>;

  abstract getUserInfo(userId: string): Promise<IUser>;

  abstract updateUser(userId: string, userData: Partial<IUser>): Promise<IUser>;

  abstract deleteUser(userId: string): Promise<void>;
}

export default UserService;
