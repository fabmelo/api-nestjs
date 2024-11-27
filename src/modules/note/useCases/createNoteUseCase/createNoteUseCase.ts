import { Injectable } from '@nestjs/common';
import { Note } from '../../entities/note';
import { NoteRepository } from '../../repositories/noteRepository';

interface CreateNoteRequest {
  title: string;
  description: string;
  userId: string;
}

@Injectable()
export class CreateNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }
  async execute({ title, description, userId }: CreateNoteRequest) {
    const note = new Note({
      title,
      description,
      userId,
    });
    await this.noteRepository.create(note);
    return note;
  }
}
