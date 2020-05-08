import { Application, Request, Response } from 'express';

export default (app: Application) => {
  app.get('/hi', (req: Request, resp: Response) => {
    resp.send('hi');
  });
};
