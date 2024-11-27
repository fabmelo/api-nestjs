import { makeUser } from '../../../../modules/user/factories/userFactory';
import { NoteNotFoundException } from '../../exceptions/noteNotFound.exception';
import { NoteWithoutPermissionException } from '../../exceptions/noteWithoutPermission.exception';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { EditNoteUseCase } from './editNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('should be able to edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'fakeTitle';
    const descriptionChanged = 'fakeDescription';

    await editNoteUseCase.execute({
      title: titleChanged,
      description: descriptionChanged,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(descriptionChanged);
  });

  it('should be able to throw error when not found note', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fakeTitle',
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteNotFoundException);
  });

  it('should be able to throw error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fakeTitle',
        noteId: note.id,
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteWithoutPermissionException);
  });
});
