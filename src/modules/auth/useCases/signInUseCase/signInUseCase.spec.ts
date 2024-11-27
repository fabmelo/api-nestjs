import { JwtService } from '@nestjs/jwt';
import { makeUser } from 'src/modules/user/factories/userFactory';
import { UserPayload } from '../../models/UserPayload';
import { SignInUseCase } from './signInUseCase';

let signInUseCase: SignInUseCase;
let jwtService: JwtService;

describe('Sign In', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' });
    signInUseCase = new SignInUseCase(jwtService);
  });

  it ('should be able to create valid access_token', async () => {
    const user = makeUser({});
    const token = await signInUseCase.execute({ user });
    const payload = jwtService.decode(token) as UserPayload;

    expect(payload.sub).toEqual(user.id);
  });
    
});
