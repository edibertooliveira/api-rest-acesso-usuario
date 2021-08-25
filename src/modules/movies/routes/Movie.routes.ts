import { Router } from 'express';
import MoviesController from '../controller/MoviesController';
import MoviesAvatarController from '../controller/MoviesAvatarController';
import { celebrate, Joi, Segments } from 'celebrate';
import auth, {
  restrictionLevel,
} from '../../../shared/api/middlewares/isAuthenticated';
import usersRouter from '@modules/users/routes/register.routes';
import multer from 'multer';
import uploadConfig from '@config/upload';
const upload = multer(uploadConfig.multer);

const moviesRouter = Router();
const moviesController = new MoviesController();
const moviesAvatarController = new MoviesAvatarController();

moviesRouter.get(
  '/search',
  auth(restrictionLevel(0)),
  celebrate({
    [Segments.QUERY]: {
      director: Joi.string(),
      author: Joi.string(),
      genre: Joi.string(),
    },
  }),
  moviesController.search,
);

moviesRouter
  .route('/')
  .get(auth(restrictionLevel(0)), moviesController.index)
  .post(
    auth(restrictionLevel(2)),
    celebrate({
      [Segments.BODY]: {
        title: Joi.string().min(2).required(),
        genre: Joi.string().min(2).required(),
        directors: Joi.string().min(2).required(),
        authors: Joi.string().min(2).required(),
        year: Joi.number().integer().positive().min(4).required(),
      },
    }),
    moviesController.create,
  );

usersRouter.patch(
  '/image/:id',
  auth(restrictionLevel(0)),
  upload.single('image'),
  moviesAvatarController.update,
);

moviesRouter.get(
  '/:id',
  auth(restrictionLevel(0)),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.show,
);

moviesRouter.post(
  '/vote',
  auth(restrictionLevel(1)),
  celebrate({
    [Segments.BODY]: {
      movieId: Joi.string().required(),
      value: Joi.number().integer().positive().min(1).required(),
    },
  }),
  moviesController.vote,
);

moviesRouter.put(
  '/:id',
  auth(restrictionLevel(2)),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      title: Joi.string().min(2),
      genre: Joi.string().min(2),
      directors: Joi.string().min(2),
      authors: Joi.string().min(2),
      year: Joi.number().integer().min(4).positive(),
    },
  }),
  moviesController.update,
);

moviesRouter.delete(
  '/:id',
  auth(restrictionLevel(2)),
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  moviesController.delete,
);

export default moviesRouter;
