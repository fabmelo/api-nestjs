import { Note } from '../entities/note';
import { NoteRepository } from './noteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    await this.notes.push(note);
  }

  async delete(id: string): Promise<void> {
    this.notes = await this.notes.filter((note) => note.id !== id);
  }

  async findById(id: string): Promise<Note | null> {
    const note = await this.notes.find((note) => note.id === id);
    if (!note) return null;
    return note;
  }

  async save(note: Note): Promise<void> {
    const noteIndex = await this.notes.findIndex(
      (currentNote) => currentNote.id === note.id,
    );
    if (noteIndex >= 0) this.notes[noteIndex] = note;
  }

  async findManyByUserId(userId: string, page: number, limit: number): Promise<Note[]> {
    const notes = await this.notes.filter((note) => note.userId === userId);
    return notes.slice((page - 1) * limit, page * limit);
  }
}
