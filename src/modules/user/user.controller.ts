import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import type { IUser } from 'src/interfaces/models';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body()
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ) {
    return this.userService.createUser(userData);
  }

  @Get(':userId')
  async getUserInfo(@Param('userId') userId: string) {
    return this.userService.getUserInfo(userId);
  }

  @Get(':userId/address')
  async getAddress(@Param('userId') userId: string) {
    return this.userService.getAddress(userId);
  }

  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() userData: Partial<IUser>,
  ) {
    return this.userService.updateUser(userId, userData);
  }

  @Delete(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
