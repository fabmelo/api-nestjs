import { makeUser } from '../../../../modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetNoteUseCase } from './getNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
        noteId: note.id,
        userId: user.id,
    });

    expect(result).toEqual(note);

  });

  it('should be able to throw error when not found note', async () => {
    expect(async () => {
      await getNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });
});
