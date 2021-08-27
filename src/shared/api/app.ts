import '@shared/container';
import createConnection from '@shared/typeorm';
import express from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import { errors } from 'celebrate';
import cors from 'cors';
import uploadConfig from '@config/upload';
import routes from './routers';
import rateLimiter from './middlewares/rateLimiter';
import errorApi from '@shared/api/middlewares/errorApi';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/file', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use(errorApi);

export default app;
