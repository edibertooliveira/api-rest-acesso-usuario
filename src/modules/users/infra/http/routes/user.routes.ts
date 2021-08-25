import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import { UsersController } from '../controllers';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter
  .route('/')
  .get(usersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().min(2).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      },
    }),
    usersController.create,
  );

export default usersRouter;
