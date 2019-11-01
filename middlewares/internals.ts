import { Application } from 'express';

export type MiddlewareLoader = (app: Application) => void;
