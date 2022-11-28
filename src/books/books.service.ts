import { Injectable } from '@nestjs/common';
import { bookSchema } from 'src/model/book.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}
  async create(dto) {
    try {
      const value = await bookSchema.validateAsync(dto);
      const book = await this.prisma.book.create({
        data: value,
      });
      return book;
    } catch (err) {
      throw err;
    }
  }
}
