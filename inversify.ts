import { Application } from 'express';
import errorHandler from 'errorhandler';
import { Container } from 'inversify';
import { DebuggerExtSpawn } from 'debug-fabulous';
import 'reflect-metadata';
import { interfaces, InversifyExpressServer, TYPE } from 'inversify-express-utils';

import { MiddlewareLoader } from './middlewares/internals';
import * as defaultControllers from './controllers';
import { middlewares as defaultMiddlewares } from './middlewares';

export interface InversifyExpressProps {
  controllers: Record<string, interfaces.Controller>;
  middlewares: MiddlewareLoader;
  routes?: MiddlewareLoader;
  debug: DebuggerExtSpawn;
}

const inversifyExpress = ({
  controllers,
  middlewares,
  debug,
}: InversifyExpressProps): Application => {
  // @ts-ignore
  const d = debug.spawn('inversifyExpress');
  const container = new Container();
  // NOTE that you *must* bind your controllers to Controller
  const controllerKeys = Object.keys(controllers);

  for (let i = 0; i < controllerKeys.length; i++) {
    const c = controllers[controllerKeys[i]];
    d(() => c);
    container
      .bind<interfaces.Controller>(TYPE.Controller)
      // @ts-ignore
      .to(c)
      .inSingletonScope()
      // @ts-ignore
      .whenTargetNamed(c.name);
  }
  // d(() => get(container, '_bindingDictionary'));
  d(() => 'returning Express Server');
  return new InversifyExpressServer(container)
    .setConfig(middlewares)
    .setErrorConfig((_app: Application) => {
      // @ts-ignore
      debug.spawn('setErrorConfig')(() => 'called');

      // if (!config.isProd) {
      debug(() => 'Running in development mode');
      // @ts-ignore
      _app.use(errorHandler());
      // } else {
      //   _app.use(
      //     (
      //       err: Error,
      //       request: express.Request,
      //       response: express.Response,
      //       // eslint-disable-next-line no-unused-vars
      //       next: express.NextFunction
      //     ) => {
      //       console.error(err.stack);
      //       // TODO: be more detailed or use more similar to non prod
      //       response.status(500).send('Something broke!');
      //     }
      //   );
      // }
    })
    .build();
};

export const init = ({
  controllers = defaultControllers,
  middlewares = defaultMiddlewares,
  routes,
  debug,
}: InversifyExpressProps) => {
  const d = debug.spawn('expressInit');
  // shared should be a shorter list, done expand ...controllers (large)
  // each(sharedControllers, (c, k) => {
  //   controllers[k] = c;
  //   d(() => `${k} controller set`);
  // }); // extending controllers to have shared

  const app = inversifyExpress({
    controllers,
    middlewares,
    routes,
    // @ts-ignore
    debug: d,
  });
  if (routes) routes(app);
  return app;
};
