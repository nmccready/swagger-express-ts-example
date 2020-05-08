// import express from 'express';
import { init } from './inversify';
import { rootDebug } from './debug';
import routes from './routes';

const debug = rootDebug.spawn('server');

// const app = express();
const app = init({
  // @ts-ignore
  debug,
  routes,
});
const port = 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
