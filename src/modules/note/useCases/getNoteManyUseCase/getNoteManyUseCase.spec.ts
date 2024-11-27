import { makeUser } from 'src/modules/user/factories/userFactory';
import { Note } from '../../entities/note';
import { makeNote } from '../../factories/noteFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { GetNoteManyUseCase } from './getNoteManyUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteManyUseCase: GetNoteManyUseCase;

describe('Get Note Many Use Case', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteManyUseCase = new GetNoteManyUseCase(noteRepositoryInMemory);
  });

  it('should be able to get many note', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getNoteManyUseCase.execute({
      userId: user.id,
    });

    expect(result).toEqual(notes);
  });

  it('should be able to get only user notes', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});

    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: index < 5 ? user1.id : user2.id }),
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getNoteManyUseCase.execute({
      userId: user1.id,
    });

    expect(result).toHaveLength(5);
  });

  it('should be able to control notes limit', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() => makeNote({ userId: user.id }));

    noteRepositoryInMemory.notes = notes;

    const result = await getNoteManyUseCase.execute({
      userId: user.id,
      limit: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('should be able to control note page', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map((_, index) =>
      makeNote({ userId: user.id, title: index < 5 ? 'page 1' : 'page 2' }),
    );

    noteRepositoryInMemory.notes = notes;

    let result: Note[];

    result = await getNoteManyUseCase.execute({
      userId: user.id,
      limit: '5',
      page: '2',
    });

    expect(result[0].title).toEqual('page 2');

    result = await getNoteManyUseCase.execute({
      userId: user.id,
      limit: '5',
      page: '1',
    });

    expect(result[0].title).toEqual('page 1');
  });
});
