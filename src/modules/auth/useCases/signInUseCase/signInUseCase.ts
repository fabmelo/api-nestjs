import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../../../user/entities/user";
import { UserPayload } from "../../models/UserPayload";

interface SignInRequest {
    user: User
}

@Injectable()
export class SignInUseCase {

    constructor(private readonly jwtService: JwtService) {}

    async execute( { user }: SignInRequest ) {
        const payload: UserPayload = {
            sub: user.id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt.toJSON()
        }

        const jwtToken = this.jwtService.sign(payload);

        return jwtToken;
    }

}