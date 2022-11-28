import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { schema } from 'src/model/user.model';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(dto) {
    try {
      const value = await schema.validateAsync(dto);
      // console.log('------value', value);

      const user = await this.prisma.user.create({
        data: value,
      });
      return user;
    } catch (err) {
      // console.log('---rrrr--', err);

      throw err;
    }
  }
}
