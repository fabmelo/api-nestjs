import { User as UserRaw } from '@prisma/client';
import { User } from '../../../../modules/user/entities/user';

export class PrismaUserMapper {
  static toPrisma({ createdAt, email, name, password, id }: User): UserRaw {
    return {
      id,
      email,
      name,
      password,
      createdAt,
    };
  }

  static toDomain({ id, ...userData }: UserRaw): User {
    return new User(
      {
        ...userData,
      },
      id,
    );
  }
}
