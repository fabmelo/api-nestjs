import { Note as NoteRaw } from '@prisma/client';
import { Note } from '../../../../modules/note/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    createdAt,
    id,
    description,
    title,
    userId,
  }: Note): NoteRaw {
    return {
      id,
      description,
      title,
      userId,
      createdAt,
    };
  }

  static toDomain({
    id,
    createdAt,
    description,
    title,
    userId,
  }: NoteRaw): Note {
    return new Note(
      {
        description,
        title,
        userId,
        createdAt,
      },
      id,
    );
  }
}
