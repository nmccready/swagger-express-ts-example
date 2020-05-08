import { Application } from 'express';
import { loadAll } from '../modules';
import { rootDebug } from '../debug';

const debug = rootDebug.spawn('routes');

export default (app: Application) => {
  loadAll([import('./hi')], { app, debug });
};
