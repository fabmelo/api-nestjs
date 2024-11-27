import * as bcrypt from 'bcrypt';
import { makeUser } from '../../../../modules/user/factories/userFactory';
import { UserRepositoryInMemory } from '../../../user/repositories/userRepositoryInMemory';
import { AuthValuesIncorrectException } from '../../exceptions/authValueIncorrect.exception';
import { ValidateUserUseCase } from './validateUserUseCase';

let validateUserUseCase: ValidateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Validate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    validateUserUseCase = new ValidateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to return user when credentials are correct', async () => {
    const userPasswordWithoutEncypted = '1234';
    const user = makeUser({
      password: await bcrypt.hash(userPasswordWithoutEncypted, 10),
    });

    userRepositoryInMemory.users = [user];

    const result = await validateUserUseCase.execute({
      email: user.email,
      password: userPasswordWithoutEncypted,
    });

    expect(result).toEqual(user);
  });

  it('Should be able to throw error when credentials incorrect', async () => {
    const userPasswordWithoutEncypted = '1234';
    const user = makeUser({
      password: await bcrypt.hash(userPasswordWithoutEncypted, 10),
    });

    userRepositoryInMemory.users = [user];

    expect(async () => {
      await validateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: userPasswordWithoutEncypted,
      });
    }).rejects.toThrow(AuthValuesIncorrectException);

    expect(async () => {
      await validateUserUseCase.execute({
        email: user.email,
        password: 'incorrect_password',
      });
    }).rejects.toThrow(AuthValuesIncorrectException);
  });
});
