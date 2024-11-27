import { Injectable } from '@nestjs/common';
import { User } from '../../../../modules/user/entities/user';
import { UserRepository } from '../../../../modules/user/repositories/userRepository';
import { PrismaUserMapper } from '../mappers/PrismaUserMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const userRaw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: userRaw,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
