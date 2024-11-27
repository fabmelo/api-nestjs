import { compare } from 'bcrypt';
import { UserWithSameEmailException } from '../../exceptions/userWithSameEmail.exception';
import { makeUser } from '../../factories/userFactory';
import { UserRepositoryInMemory } from '../../repositories/userRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User Use Case', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to create user', async () => {
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'teste@teste.com',
      password: '1234',
    });

    expect(userRepositoryInMemory.users).toEqual([user]);
  });

  it('should be able to create user with password encrypted', async () => {
    const userPasswordWithoutEncypted = '1234';
    const user = await createUserUseCase.execute({
      name: 'User Test',
      email: 'teste@teste.com',
      password: userPasswordWithoutEncypted,
    });
    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncypted,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });

  it('should not be able to create user with same email', async () => {
    const user = makeUser({});
    userRepositoryInMemory.users = [user];

    expect(
      async () =>
        await createUserUseCase.execute({
          email: user.email,
          name: 'User Test',
          password: '1234',
        }),
    ).rejects.toThrow(UserWithSameEmailException);
  });
});
