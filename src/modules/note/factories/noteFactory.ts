import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Note test',
      description: 'Description test',      
      userId: '123456',
      ...override,
    },
    id,
  );
};
