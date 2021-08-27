import { Router } from 'express';

import registerRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import docRouter from '@shared/api/routers/doc.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/register', registerRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use(docRouter);

export default routes;
