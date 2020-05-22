module.exports = {
  dev: {
    driver: 'pg',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: 'localhost',
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    schema: 'znemz-express',
  },
};
