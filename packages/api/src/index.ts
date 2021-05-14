import * as dotenv from 'dotenv';
import { Action, useExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { User } from './entities/user';
import cors from 'cors';
import chalk from 'chalk';
dotenv.config({
  path: join(__dirname, '../.env'),
});
require('tsconfig-paths/register');
const PORT = process.env.PORT || 3000;
import rateLimiter from 'express-rate-limit';
async function main() {
  const server = express();
  // Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // see https://expressjs.com/en/guide/behind-proxies.html
  // app.set('trust proxy', 1);

  const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors({ origin: '*' }));
  server.use('/donkey/v1/auth/', limiter);
  await createConnection({
    database: join(__dirname, '../db.sqlite'),
    type: 'better-sqlite3',
    entities: [join(__dirname, './entities/*')],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logger: /*process.env.PROD ? undefined : */ 'simple-console',
    logging: /*process.env.PROD ? false :*/ true,
    synchronize: true,
  }).then((conn) => {
    useExpressServer(server, {
      routePrefix: '/donkey/v1',
      controllers: [__dirname + '/controllers/*{.ts,.js}'],
      currentUserChecker: async (action: Action) => {
        const accessToken = action.request.headers['access-token'] as string;
        const data = <{ userId: string }>(
          verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
        );
        return conn.getRepository(User).findOne({ id: data.userId });
      },
    });
    if (!process.env.PROD) {
      server._router.stack.forEach(function (r: any) {
        if (r.route && r.route.path && r.route.methods) {
          console.log(
            chalk.yellow(r.route.path.toUpperCase()),
            '||',
            chalk.greenBright(
              Object.keys(r.route.methods).map((el) => el.toUpperCase()),
            ),
          );
        }
      });
    }
    server.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`),
    );
  });
}

main();
