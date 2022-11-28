import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BooksService } from './books.service';

@Module({
  providers: [BooksService, PrismaService],
})
export class BooksModule {}
