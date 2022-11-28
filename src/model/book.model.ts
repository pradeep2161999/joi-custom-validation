import * as Joi from 'joi';
export const bookSchema = Joi.object({
  book_name: Joi.string().required().min(5).max(30),
  book_author: Joi.string().required().min(5).max(30),
  title: Joi.string().required().min(5).max(30),
  description: Joi.string().required().min(10).max(200),
  user_id: Joi.string().max(Joi.ref('id')),

});
