import '@shared/container';
import createConnection from '@shared/typeorm';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { pagination } from 'typeorm-pagination';
import { errors } from 'celebrate';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import * as OpenApiValidator from 'express-openapi-validator/';

import doc from './documentation/api.schema.json';
import uploadConfig from '@config/upload';
import HandleError from '@shared/errors/handleError';
import routes from './routers';
import rateLimiter from './middlewares/rateLimiter';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/file', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
app.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(doc),
  OpenApiValidator.middleware({
    apiSpec: doc as unknown as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  }),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof HandleError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  // eslint-disable-next-line no-console
  console.error(err.message);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

export default app;
