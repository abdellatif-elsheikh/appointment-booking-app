import Joi from 'joi';

export const schema = Joi.object({
  title: Joi.string().trim().required().max(100).min(3),
  price: Joi.number().min(1).max(999999).required(),
  date: Joi.date().required(),
  description: Joi.string().trim().min(3).required(),
  user_id: Joi.string().required().exist(),
});

export default schema;
