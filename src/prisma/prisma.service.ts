import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
      super({
        datasources: {
          db: {
            url: 'postgresql://valid1:password@localhost:5432/nest111?schema=public'
          },
        },
      });
    }
  }
  