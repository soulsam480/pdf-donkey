import { Action, useExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { User } from './entities/user';
import cors from 'cors';
import chalk from 'chalk';
require('tsconfig-paths/register');
const PORT = process.env.PORT || 3000;

async function main() {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cors({ origin: '*' }));
  await createConnection({
    database: './db.sqlite',
    type: 'sqlite',
    entities: [join(__dirname, './entities/*')],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logger: 'simple-console',
    logging: true,
    synchronize: true,
  }).then((conn) => {
    useExpressServer(server, {
      routePrefix: '/api/v1',
      controllers: [__dirname + '/controllers/*{.ts,.js}'],
      currentUserChecker: async (action: Action) => {
        const accessToken = action.request.headers['access-token'] as string;
        const data = <{ userId: string }>(
          verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
        );
        return conn.getRepository(User).findOne({ id: data.userId });
      },
    });
    server._router.stack.forEach(function (r: any) {
      if (r.route && r.route.path && r.route.methods) {
        console.log(
          chalk.blue(r.route.path),
          '||',
          chalk.red(...Object.keys(r.route.methods)),
        );
      }
    });
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
}

main();
