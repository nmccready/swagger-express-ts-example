import * as bodyParser from 'body-parser';
import express, { Application } from 'express';

import * as swagger from 'swagger-express-ts';
import '../../models';
import { MiddlewareLoader } from '../internals';

export const middlewares: MiddlewareLoader = (app: Application) => {
  app.use('/api-docs/swagger', express.static('swagger'));
  app.use('/api-docs/swagger/assets', express.static('node_modules/swagger-ui-dist'));
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: 'My api',
          version: '1.0',
        },
        externalDocs: {
          url: 'My url',
        },
        // Models can be defined here
      },
    })
  );

  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction // argument count matters even if not used
    ) => {
      console.error(err.stack);
      response.status(500).send('Something broke!');
    }
  );
};
