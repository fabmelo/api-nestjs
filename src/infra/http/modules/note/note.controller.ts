import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
} from '@nestjs/common';
import { CreateNoteUseCase } from '../../../../modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { DeleteNoteUseCase } from '../../../../modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { EditNoteUseCase } from '../../../../modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { GetNoteManyUseCase } from '../../../../modules/note/useCases/getNoteManyUseCase/getNoteManyUseCase';
import { GetNoteUseCase } from '../../../../modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/createNoteBody';
import { EditNoteBody } from './dtos/editNoteBody';
import { NoteViewModel } from './viewModel/noteViewModel';

@Controller('notes')
export class NoteController {
  constructor(
    private readonly createNoteUseCase: CreateNoteUseCase,
    private readonly deleteNoteUseCase: DeleteNoteUseCase,
    private readonly editNoteUseCase: EditNoteUseCase,
    private readonly getNoteUseCase: GetNoteUseCase,
    private readonly getNoteManyUseCase: GetNoteManyUseCase,
  ) {}

  @Post()
  async create(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;
    const note = await this.createNoteUseCase.execute({
      title,
      description,
      userId: request.user.id,
    });
    return NoteViewModel.toHttp(note);
  }

  @Put(':noteId')
  async edit(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: EditNoteBody,
    @Param('noteId') noteId: string,
  ) {
    const { title, description } = body;
    await this.editNoteUseCase.execute({
      noteId,
      title,
      description,
      userId: request.user.id,
    });
  }

  @Delete(':noteId')
  async delete(
    @Request() request: AuthenticatedRequestModel,
    @Param('noteId') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }

  @Get(':noteId')
  async get(
    @Request() request: AuthenticatedRequestModel,
    @Param('noteId') noteId: string,
  ) {
    const note = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
    return NoteViewModel.toHttp(note);
  }

  @Get()
  async getMany(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const notes = await this.getNoteManyUseCase.execute({
      userId: request.user.id,
      page: page,
      limit: limit,
    });
    return notes.map(NoteViewModel.toHttp);
  }
}
