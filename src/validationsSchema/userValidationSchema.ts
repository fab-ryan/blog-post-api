/* eslint-disable import/no-extraneous-dependencies */
import Joi from 'joi';

export const userValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string()
    .min(6)
    .required()
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16}$/)
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, and one digit',
    }),
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  role: Joi.string().valid('admin', 'user').default('user').messages({
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
    'any.only': 'Role must be either  "user"',
  }),
});

export const userUpdateValidationSchema = Joi.object({
  email: Joi.string()
    .email()
    .messages({
      'string.email': 'Email must be a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    })
    .optional(),
  name: Joi.string()
    .messages({
      'string.empty': 'Name is required',
      'any.required': 'Name is required',
    })
    .optional(),
  role: Joi.string().valid('admin', 'user').default('user').messages({
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
    'any.only': 'Role must be either  "user"',
  }),
});

export const emailValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
});
export const idValidationSchema = Joi.object({
  id: Joi.string()
    .required()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
    )
    .messages({
      'string.empty': 'Id is required',
      'any.required': 'Id is required',
    }),
});

export const updateUserValidationSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
  }),
  role: Joi.string().valid('admin', 'user').messages({
    'string.empty': 'Role is required',
    'any.required': 'Role is required',
    'any.only': 'Role must be either  "user"',
  }),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
    'any.required': 'Password is required',
  }),
});
