import { Application } from 'express';
import { each } from 'lodash';
import * as swagger from './swagger';
import { MiddlewareLoader } from './internals';

export * from './internals';

export const middlewares = (app: Application) => {
  each<MiddlewareLoader>(swagger, (v) => v(app));
};
