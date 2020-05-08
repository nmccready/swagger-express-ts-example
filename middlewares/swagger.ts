import * as bodyParser from 'body-parser';
import express, { Application } from 'express';
import * as swagger from 'swagger-express-ts';
import { getAbsoluteFSPath } from 'swagger-ui-dist';
import { getApiPath } from '../api';
import path from 'path';
import '../models';

// import config from '../config';
import { MiddlewareLoader } from './internals';
import { rootDebug } from '../debug';

const config = { server: { isSsl: false } };

const debug = rootDebug.spawn('swagger');
const { SwaggerDefinitionConstant: SDC } = swagger;
const swaggerAssetPath = getAbsoluteFSPath();

export const swaggerMiddleware: MiddlewareLoader = (app: Application) => {
  // assets
  const apiSwagger = getApiPath('docs/swagger');
  debug(() => ({ apiSwagger, swaggerAssetPath }));
  app.use(apiSwagger, express.static(path.join(__dirname, '../public/swagger.html')));
  app.use(getApiPath('docs/swagger/assets'), express.static(swaggerAssetPath));

  // swagger model json payload
  app.use(bodyParser.json());
  app.use(
    swagger.express({
      path: getApiPath('docs/swagger.json'),
      definition: {
        schemes: config.server.isSsl ? ['https'] : ['http'],
        info: {
          title: 'My api',
          version: '1.0',
        },
        externalDocs: {
          url: 'My url',
        },
        models: {
          ApiError: {
            properties: {
              code: {
                type: SDC.Model.Property.Type.STRING,
                example: ['400'],
              },
              message: {
                type: SDC.Model.Property.Type.STRING,
                example: ['Name of car is required.'],
              },
            },
          },
        },
        responses: {
          500: {},
        },
        securityDefinitions: {
          apiKeyHeader: {
            type: SDC.Security.Type.API_KEY,
            in: SDC.Security.In.HEADER,
            name: 'apiHeader',
          },
        },
      },
    })
  );

  return app;
};
