import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../repositories/noteRepository';

interface GetNoteManyRequest {
    userId: string;
    page?: string;
    limit?: string;
}

@Injectable()
export class GetNoteManyUseCase {
  constructor(private readonly noteRepository: NoteRepository) {
    this.noteRepository = noteRepository;
  }

  async execute({ userId, page, limit }: GetNoteManyRequest){
    
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;
    const currentPage = Number(page) || DEFAULT_PAGE;
    const currentLimit = Number(limit) || DEFAULT_LIMIT;
    const notes = await this.noteRepository.findManyByUserId(userId, currentPage, currentLimit);

    return notes;
  }
}
