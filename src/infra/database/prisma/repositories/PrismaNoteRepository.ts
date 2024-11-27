import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/note';
import { NoteRepository } from '../../../../modules/note/repositories/noteRepository';
import { PrismaNoteMapper } from '../mappers/PrismaNoteMapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prismaService.note.create({
      data: noteRaw,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.note.delete({ where: { id } });
  }

  async findById(id: string): Promise<Note | null> {
    const noteRaw = await this.prismaService.note.findUnique({ where: { id } });

    if (!noteRaw) return null;

    return PrismaNoteMapper.toDomain(noteRaw);
  }

  async save(note: Note): Promise<void> {    
    const noteRaw = PrismaNoteMapper.toPrisma(note);
    await this.prismaService.note.update({
        where: { id: noteRaw.id },
        data: noteRaw,
    });
  }

  async findManyByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Note[]> {
    const notesRaw = await this.prismaService.note.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    // TODO: Verificar caso der erro
    // return notesRaw.map((note) => PrismaNoteMapper.toDomain(note));
    return notesRaw.map(PrismaNoteMapper.toDomain);
  }
}
