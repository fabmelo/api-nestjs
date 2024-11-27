import { Module } from '@nestjs/common';
import { NoteRepository } from '../../../modules/note/repositories/noteRepository';
import { UserRepository } from '../../../modules/user/repositories/userRepository';
import { PrismaService } from './prisma.service';
import { PrismaNoteRepository } from './repositories/PrismaNoteRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: NoteRepository,
      useClass: PrismaNoteRepository,
    },
  ],
  exports: [UserRepository, NoteRepository],
})
export class DatabaseModule {}
