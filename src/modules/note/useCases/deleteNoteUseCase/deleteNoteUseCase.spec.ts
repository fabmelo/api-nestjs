import { makeUser } from '../../../../modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to delete note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('should be able to throw error when not found note', async () => {
    expect( async () => {
      await deleteNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('should be able to throw error when note has another user', async () => {

    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect( async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });

});
