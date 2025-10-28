import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import BaseUserService from 'src/framework/abstract/user.abstract';
import { IAddress, IUser } from 'src/interfaces/models';
import { Role } from 'src/types';

@Injectable()
export class UserService extends BaseUserService {
  constructor(private prisma: PrismaService) {
    super();
  }

  async createUser(
    userData: Omit<IUser, 'id' | 'createdAt' | 'updatedAt' | 'role'> & {
      password: string;
    },
  ): Promise<IUser> {
    // Criar endereço se fornecido
    let addressId: string | undefined;

    if (userData.address) {
      const address = await this.prisma.address.create({
        data: {
          street: userData.address.street,
          city: userData.address.city,
          state: userData.address.state,
          zipCode: userData.address.zipCode,
          country: userData.address.country,
        },
      });
      addressId = address.id;
    }

    // Criar usuário no banco
    const user = await this.prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        dob: userData.dob,
        pfp: userData.pfp,
        identificationNumber: userData.identificationNumber,
        phoneNumber: userData.phoneNumber,
        role: 'user',
        addressId,
      },
      include: {
        address: true,
      },
    });

    console.log('✅ Usuário criado no banco:', user.name);

    return this.mapToIUser(user);
  }

  async getUserInfo(userId: string): Promise<IUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    console.log('✅ Usuário encontrado no banco:', user.name);
    return this.mapToIUser(user);
  }

  async getAllUsers(): Promise<IUser[]> {
    const users = await this.prisma.user.findMany({
      include: {
        address: true,
      },
    });

    console.log(`✅ ${users.length} usuários encontrados no banco`);
    return users.map((user) => this.mapToIUser(user));
  }

  async updateUser(userId: string, userData: Partial<IUser>): Promise<IUser> {
    // Verificar se usuário existe
    await this.getUserInfo(userId);

    // Atualizar endereço se fornecido
    if (userData.address) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (user?.addressId) {
        // Atualizar endereço existente
        await this.prisma.address.update({
          where: { id: user.addressId },
          data: {
            street: userData.address.street,
            city: userData.address.city,
            state: userData.address.state,
            zipCode: userData.address.zipCode,
            country: userData.address.country,
          },
        });
      } else {
        // Criar novo endereço
        const address = await this.prisma.address.create({
          data: {
            street: userData.address.street,
            city: userData.address.city,
            state: userData.address.state,
            zipCode: userData.address.zipCode,
            country: userData.address.country,
          },
        });

        await this.prisma.user.update({
          where: { id: userId },
          data: { addressId: address.id },
        });
      }
    }

    // Preparar dados para atualização (remover campos que não devem ser atualizados diretamente)
    const updateData: any = {};
    if (userData.name) updateData.name = userData.name;
    if (userData.email) updateData.email = userData.email;
    if (userData.dob) updateData.dob = userData.dob;
    if (userData.pfp) updateData.pfp = userData.pfp;
    if (userData.identificationNumber)
      updateData.identificationNumber = userData.identificationNumber;
    if (userData.phoneNumber) updateData.phoneNumber = userData.phoneNumber;
    if (userData.role) updateData.role = userData.role;

    // Atualizar usuário
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
      include: {
        address: true,
      },
    });

    console.log('✅ Usuário atualizado no banco:', updatedUser.name);
    return this.mapToIUser(updatedUser);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    // Deletar endereço se existir
    if (user.addressId) {
      await this.prisma.address.delete({
        where: { id: user.addressId },
      });
    }

    // Deletar usuário
    await this.prisma.user.delete({
      where: { id: userId },
    });

    console.log('✅ Usuário deletado do banco:', userId);
  }

  async getAddress(userId: string): Promise<IAddress> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        address: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário com ID ${userId} não encontrado`);
    }

    if (!user.address) {
      throw new NotFoundException(
        `Endereço não encontrado para usuário ${userId}`,
      );
    }

    console.log('✅ Endereço encontrado para usuário:', userId);
    return this.mapToIAddress(user.address);
  }

  // Métodos auxiliares para mapear dados do Prisma para interfaces
  private mapToIUser(user: any): IUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      dob: user.dob,
      pfp: user.pfp,
      identificationNumber: user.identificationNumber,
      phoneNumber: user.phoneNumber,
      role: user.role as Role,
      address: user.address ? this.mapToIAddress(user.address) : (null as any),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  private mapToIAddress(address: any): IAddress {
    return {
      id: address.id,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      createdAt: address.createdAt.toISOString(),
      updatedAt: address.updatedAt.toISOString(),
    };
  }
}
