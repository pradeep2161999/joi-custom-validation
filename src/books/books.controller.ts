import { Controller, Post, Req, Res } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}
  @Post()
  create(@Req() request, @Res() response) {
    return this.bookService
      .create(request.body)
      .then((book) => {
        response.send(book);
      })
      .catch((errors) => {
        response.send({ errors: `${errors.message}` });
      });
  }
}
