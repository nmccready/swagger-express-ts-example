import debug from 'debug-fabulous';

import pkg from './package.json';

export const rootDebug = debug.spawnable(pkg.name);
