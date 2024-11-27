import { Injectable } from '@nestjs/common';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { NoteRepository } from '../../repositories/noteRepository';

interface GetNoteRequest {
    noteId: string;
    userId: string;
}

@Injectable()
export class GetNoteUseCase {
  constructor(private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ noteId, userId }: GetNoteRequest){
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundException();

    if (note.userId !== userId) throw new NoteWithoutPermissionException({ actionName: 'obter' });

    return note;
  }
}
