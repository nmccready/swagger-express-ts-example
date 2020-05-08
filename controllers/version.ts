import { Request, Response } from 'express';
import { interfaces, httpGet, httpPost, controller } from 'inversify-express-utils';
import { injectable,  } from 'inversify';
import {
  ApiPath,
  ApiOperationGet,
  ApiOperationPost,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';

import { getApiPath } from '../api';

const path = getApiPath('versions');

@ApiPath({
  path,
  name: 'Version',
  security: { basicAuth: [] },
})
@controller(path)
@injectable()
export class VersionController implements interfaces.Controller {
  public static TARGET_NAME = 'VersionController';

  private data = [
    {
      id: '1',
      name: 'Version 1',
      description: 'Description Version 1',
      version: '1.0.0',
    },
    {
      id: '2',
      name: 'Version 2',
      description: 'Description Version 2',
      version: '2.0.0',
    },
  ];

  @ApiOperationGet({
    description: 'Get versions objects list',
    summary: 'Get versions list',
    responses: {
      200: {
        description: 'Success',
        type: SwaggerDefinitionConstant.Response.Type.ARRAY,
        model: 'Version',
      },
    },
    security: {
      apiKeyHeader: [],
    },
  })
  @httpGet('/')
  public getVersions(
    request: Request,
    response: Response
    // next: NextFunction
  ): void {
    response.json(this.data);
  }

  @ApiOperationPost({
    description: 'Post version object',
    summary: 'Post new version',
    parameters: {
      body: { description: 'New version', required: true, model: 'Version' },
    },
    responses: {
      200: { description: 'Success' },
      400: { description: 'Parameters fail' },
    },
  })
  @httpPost('/')
  public postVersion(
    request: Request,
    response: Response
    // next: NextFunction
  ): void {
    if (!request.body) {
      return response.status(400).end();
    }
    this.data.push(request.body);
    response.json(request.body);
  }
}
