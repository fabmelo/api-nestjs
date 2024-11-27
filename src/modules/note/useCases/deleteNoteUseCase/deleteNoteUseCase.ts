import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { NoteRepository } from '../../repositories/noteRepository';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }
  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'deletar' });

    await this.noteRepository.delete(noteId);
  }
}
