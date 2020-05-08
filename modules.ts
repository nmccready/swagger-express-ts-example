import { map } from 'bluebird';
import { Application } from 'express';
import { DebuggerExt } from 'debug-fabulous';

export interface Loader {
  default: (app: any) => void;
}

export const load = (app: Application) => ({ default: lib }: Loader) => lib(app);

export interface LoadAllProps {
  app: Application;
  debug: DebuggerExt;
}

export const loadAll = (libs: Promise<Loader>[], { app, debug }: LoadAllProps) =>
  map(libs, load(app)).then(() => debug(() => 'done'));
