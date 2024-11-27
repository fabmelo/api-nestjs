import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './infra/database/prisma/database.module';
import { AuthModule } from './infra/http/modules/auth/auth.module';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard';
import { NoteModule } from './infra/http/modules/note/note.module';
import { UserModule } from './infra/http/modules/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, NoteModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
