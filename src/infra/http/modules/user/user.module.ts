import { Module } from "@nestjs/common";
import { DatabaseModule } from "../../../../infra/database/prisma/database.module";
import { CreateUserUseCase } from "../../../../modules/user/useCases/createUserUseCase/createUserUseCase";
import { UserController } from "./user.controller";

@Module({
    controllers: [UserController],
    imports: [DatabaseModule],
    providers: [CreateUserUseCase]
})
export class UserModule {}