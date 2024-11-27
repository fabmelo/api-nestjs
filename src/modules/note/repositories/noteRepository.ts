import { Note } from "../entities/note";

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Note | null>;
  abstract save(note: Note): Promise<void>;
  abstract findManyByUserId(userId: string, page: number, limit: number): Promise<Note[]>;
}