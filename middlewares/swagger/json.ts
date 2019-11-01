import * as bodyParser from 'body-parser';
import express, { Application } from 'express';
import 'reflect-metadata';
import { Container } from 'inversify';
import {
  interfaces,
  InversifyExpressServer,
  TYPE
} from 'inversify-express-utils';
import { VersionController } from '../../controllers/version';
import * as swagger from 'swagger-express-ts';
import '../../models';
import { MiddlewareLoader } from '../internals';

export const middlewares: MiddlewareLoader = (app: Application) => {
  // set up container
  const container = new Container();

  // note that you *must* bind your controllers to Controller
  container
    .bind<interfaces.Controller>(TYPE.Controller)
    .to(VersionController)
    .inSingletonScope()
    .whenTargetNamed(VersionController.TARGET_NAME);

  // create server
  const server = new InversifyExpressServer(container);

  app.use('/api-docs/swagger', express.static('swagger'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      definition: {
        info: {
          title: 'My api',
          version: '1.0'
        },
        externalDocs: {
          url: 'My url'
        }
        // Models can be defined here
      }
    })
  );

  app.use(
    (
      err: Error,
      request: express.Request,
      response: express.Response,
      next: express.NextFunction
    ) => {
      console.error(err.stack);
      response.status(500).send('Something broke!');
    }
  );
};
