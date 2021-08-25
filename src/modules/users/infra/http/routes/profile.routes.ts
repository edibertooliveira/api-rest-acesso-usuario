import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import auth, {
  restrictionLevel,
} from '@shared/api/middlewares/isAuthenticated';
import { ProfileController, UsersAvatarController } from '../controllers';
import usersRouter from '@modules/users/infra/http/routes/user.routes';
import uploadConfig from '@config/upload';

const upload = multer(uploadConfig.multer);
const profileRouter = Router();

const profileController = new ProfileController();
const usersAvatarController = new UsersAvatarController();

profileRouter.get('/', auth(restrictionLevel(0)), profileController.show);

profileRouter.put(
  '/',
  auth(restrictionLevel(0)),
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(5),
      email: Joi.string().email(),
      password: Joi.string().min(8),
      old_password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  profileController.update,
);
usersRouter.patch(
  '/avatar',
  auth(restrictionLevel(0)),
  upload.single('avatar'),
  usersAvatarController.update,
);

export default profileRouter;
