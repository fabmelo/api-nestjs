import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory";
import { CreateNoteUseCase } from "./createNoteUseCase";

let createNoteUseCase: CreateNoteUseCase;
let noteRepositoryInMemory: NoteRepositoryInMemory;

describe('Create Note Use Case', () => {
    beforeEach(() => {
        noteRepositoryInMemory = new NoteRepositoryInMemory();
        createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
    });

    it('should be able to create note', async () => {

        expect(noteRepositoryInMemory.notes).toEqual([]);

        const note = await createNoteUseCase.execute({
            title: 'Note Test',
            description: 'Description Test',
            userId: '123456',
        });

        expect(noteRepositoryInMemory.notes).toEqual([note]);
    });
});