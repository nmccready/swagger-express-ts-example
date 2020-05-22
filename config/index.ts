import { Config } from './internals';
import { rootDebug } from '../debug';

export * from './internals';

const debug = rootDebug.spawn('config:index');

export const getConfig = (nodeConfigDir?: string): Config => {
  if (nodeConfigDir) process.env.NODE_CONFIG_DIR = nodeConfigDir;

  debug(() => `NODE_ENV: ${process.env.NODE_ENV || 'default (config)'}`);

  const configLib = require('config');

  const config: Config = configLib.util.toObject(configLib);

  // d(() => ({ config }));
  return config;
};

const rootConfig = getConfig();

export default rootConfig;
