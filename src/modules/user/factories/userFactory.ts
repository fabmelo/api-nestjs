import { User } from '../entities/user';

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@email.com',
      name: 'User test',
      password: '1234',
      ...override,
    },
    id,
  );
};
