import { Injectable, NotFoundException } from '@nestjs/common';
import * as Joi from 'joi';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class model {
  constructor(private prisma: PrismaService) {}
  async findOne(email) {
    const userEmail = await this.prisma.user
      .findFirst({
        where: {
          email: email,
        },
      })
      .then((isEmailUnique) => {
        if (isEmailUnique) {
          throw new NotFoundException('email is already exists');
        } else {
          return email;
        }
      })
      .catch((error) => {
        throw error;
      });
  }
}
const prisma = new PrismaService();

const m = new model(prisma);

export const schema = Joi.object({
  email: Joi.string()
    .external(async (email) => {
      const userEmail = await m.findOne(email);
      return userEmail;
    })
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'in'],
      },
    })
    .required(),
  password: Joi.string()
    .required()
    .min(3)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/, //min 1 uppercase, min 1 lowercase, min 1 special character, min 1 number, min 8 character, max 30 character
    )
    .strict()
    .messages({
      'string.pattern.base': `Password should be between 3 to 30 characters and contain letters or numbers or special characters only`,
      'string.empty': `Password cannot be empty`,
      'any.required': `Password is required`,
      'string.regex.validate.specialchars': `Password should contain special characters`,
    }),
  confirm_password: Joi.any().valid(Joi.ref('password')).required().messages({
    'any.only': `The two passwords do not match`,
    'any.required': `confirm_Password is required`,
  }),
  first_name: Joi.string().min(3).max(30).required().messages({
    'any.required': `first_name is required`,
    'string.empty': `first_name canot be empty`,
    'string.min': `first_name should be minimum 3 character`,
    'string.max': `first_name should be maximum 30 character`,
  }),
  last_name: Joi.string().min(3).max(30).required().messages({
    'any.required': `last_name is required`,
    'string.empty': `last_name canot be empty`,
    'string.min': `last_name should be minimum 3 character`,
    'string.max': `last_name should be maximum 30 character`,
  }),
  phone_num: Joi.string()
    .regex(/^\d{10}$/)
    .required()
    .messages({
      'any.required': `Phone number is required`,
      'string.pattern.base': `phone number is invalid`,
    }),
  created_at: Joi.date().timestamp().raw(),
});

