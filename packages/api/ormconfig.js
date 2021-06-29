const path = require('path');
/**
 * @type {import('typeorm').ConnectionOptions}
 */
module.exports = {
  type: 'postgres',
  // database: path.join(__dirname, './db.sqlite'),
  username: process.env.PGRES_USER,
  password: process.env.PGRES_PASS,
  host: process.env.PGRES_HOST,
  port: process.env.PGRES_PORT,
  database: process.env.PGRES_DB,
  logging: true,
  logger: 'advanced-console',
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscriber',
  },
};
