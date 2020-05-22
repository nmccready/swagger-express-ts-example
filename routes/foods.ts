import dbFact from 'knex';
import { Application, Request, Response } from 'express';
import rootConfig from '../config';

const { connection, client } = rootConfig.db;

export default (app: Application) => {
  app.get('/foods', (req: Request, resp: Response) => {
    const db = dbFact({ client, connection });

    // db.raw('SELECT * from food').then(({ rows }) => resp.json(rows));
    db('food').then((f) => resp.json(f));
  });
};
