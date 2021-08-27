import swaggerUI from 'swagger-ui-express';
import doc from '@shared/api/documentation/api.schema.json';
import * as OpenApiValidator from 'express-openapi-validator';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';
import { Router } from 'express';

const docRouter = Router();

docRouter.use(
  '/docs',
  swaggerUI.serve,
  swaggerUI.setup(doc),
  OpenApiValidator.middleware({
    apiSpec: doc as unknown as OpenAPIV3.Document,
    validateRequests: true,
    validateResponses: true,
  }),
);

export default docRouter;
