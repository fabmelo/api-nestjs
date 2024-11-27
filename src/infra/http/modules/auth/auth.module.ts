import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from '../../../../infra/database/prisma/database.module';
import { JwtStrategy } from '../../../../modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from '../../../../modules/auth/strategies/local.strategy';
import { SignInUseCase } from '../../../../modules/auth/useCases/signInUseCase/signInUseCase';
import { ValidateUserUseCase } from '../../../../modules/auth/useCases/validateUserUseCases/validateUserUseCase';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidade.middleware';

@Module({
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
