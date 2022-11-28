import { Controller, Post, Req, Res } from '@nestjs/common';
import { request, response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Req() request, @Res() response) {
    return this.userService
      .create(request.body)
      .then((user) => {
        response.send(user);
      })
      .catch((errors) => {
        // console.log('-------err', errors);

        response.send({ errors: `${errors.message}` });
      });
  }
}
