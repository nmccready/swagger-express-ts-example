export interface DbConfig {
  connection: {
    host: string;
    port: number;
    user?: string;
    password?: string;
    database: string;
  };
  client: string;
}

export interface Config {
  db: DbConfig;
}
