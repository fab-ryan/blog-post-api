/* eslint-disable import/no-extraneous-dependencies */
import joi from 'joi';

export const postValidationSchema = {
  createPost: joi.object({
    title: joi.string().required(),
    content: joi.string().required(),
  }),
  updatePost: joi.object({
    title: joi.string(),
    content: joi.string(),
  }),
  postId: joi.object({
    postId: joi.string().required(),
  }),
};
