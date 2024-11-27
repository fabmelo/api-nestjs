import { Module } from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { GetNoteManyUseCase } from 'src/modules/note/useCases/getNoteManyUseCase/getNoteManyUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { DatabaseModule } from '../../../../infra/database/prisma/database.module';
import { NoteController } from './note.controller';

@Module({
  controllers: [NoteController],
  imports: [DatabaseModule],
  providers: [
    CreateNoteUseCase,
    DeleteNoteUseCase,
    EditNoteUseCase,
    GetNoteUseCase,
    GetNoteManyUseCase,
  ],
})
export class NoteModule {}
