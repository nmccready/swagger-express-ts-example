import express, { Application } from 'express';
import { MiddlewareLoader } from '../internals';

export const landing: MiddlewareLoader = (app: Application) => {
  app.use('/api-docs/swagger', express.static('public/swagger.html'));
  app.use(
    '/api-docs/swagger/assets',
    express.static('node_modules/swagger-ui-dist')
  );
};
