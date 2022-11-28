import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';

@Module({
  imports: [UserModule, PrismaModule, BooksModule],
  controllers: [AppController, UserController, BooksController],
  providers: [AppService, PrismaService, UserService, BooksService],
})
export class AppModule {}
