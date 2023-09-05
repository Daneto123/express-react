import Joi, { ObjectSchema } from 'joi';

const emailSchema: ObjectSchema = Joi.object().keys({
  email: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Email must be of type string',
    'string.required': 'Field must be valid',
    'string.empty': 'Field must be valid'
  })
})

const passwordSchema: ObjectSchema = Joi.object().keys({
  password: Joi.string().required().min(4).max(8).messages({
    'string.base': 'Password must be of type string',
    'string.min': 'Invalid password',
    'string.max': 'Invalid password',
    'string.empty': 'Password is a required field'
  }),
  confirmpassword: Joi.string().required().min(4).max(8).messages({
    'any.only': 'Password should match',
    'any.required': 'Comfirm password is a required field'
  })
});

export { emailSchema, passwordSchema };
