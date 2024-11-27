import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { NoteRepository } from '../../repositories/noteRepository';

interface EditNoteRequest {
  title: string;
  description?: string;
  noteId: string;
  userId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ description, noteId, title, userId }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'editar' });

    note.title = title;
    note.description = description || null;

    await this.noteRepository.save(note);

    return note
  }
}
