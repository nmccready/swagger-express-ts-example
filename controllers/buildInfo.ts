import getBuildInfo from '@znemz/build-info';
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { controller, interfaces, httpGet } from 'inversify-express-utils';
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { getApiPath } from '../api';
import { rootDebug } from '../debug';

const debug = rootDebug.spawn('controllers:buildInfo');

const path = getApiPath('buildInfo.json');

@ApiPath({
  path,
  name: 'Build Info',
  description:
    'Endpoints for fetching information about the current build. {version|branch ..etc}',
  security: { basicAuth: [] },
})
@injectable()
@controller(path)
export class BuildInfoController implements interfaces.Controller {
  @ApiOperationGet({
    description: 'Get versions objects list',
    summary: 'Get versions list',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.OBJECT,
        model: 'Build',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet('/')
  public get(request: Request, response: Response, next: NextFunction): void {
    const pack = require.resolve('../package.json');
    const build = pack.replace('/package.json', '');
    // @ts-ignore
    debug.spawn('fetching pack')(() => ({ pack, build }));

    getBuildInfo({
      pack: [pack],
      build: [build],
    })
      .then((info) => {
        // @ts-ignore
        debug.spawn('received')(() => ({ info }));
        response.json(info);
      })
      .catch((e: Error) => {
        console.error(e);
        next(e);
      });
  }
}
