import { Config } from './internals';

import dbConfig from '../database';

const { dev } = dbConfig;

const config: Config = {
  db: {
    connection: {
      ...dev,
      port: +dev.port,
    },
    client: dev.driver,
  },
};

export default config;
