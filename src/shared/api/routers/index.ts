import { Router } from 'express';

import movieRouter from '@modules/movies/routes/Movie.routes';
import registerRouter from '@modules/users/routes/register.routes';
import sessionRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/movies', movieRouter);
routes.use('/register', registerRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;
