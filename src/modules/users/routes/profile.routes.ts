import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { ProfileController, UsersAvatarController } from '../controllers';
import auth, {
  restrictionLevel,
} from '../../../shared/api/middlewares/isAuthenticated';
import usersRouter from '@modules/users/routes/register.routes';
import multer from 'multer';
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
      name: Joi.string().min(4),
      email: Joi.string().email(),
      password: Joi.string().min(8).required(),
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

profileRouter.delete('/', auth(restrictionLevel(0)), profileController.delete);

usersRouter.patch(
  '/',
  auth(restrictionLevel(0)),
  upload.single('avatar'),
  usersAvatarController.update,
);

export default profileRouter;
