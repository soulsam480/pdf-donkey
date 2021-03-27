import { useExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { join } from 'path';
import express from 'express';
const PORT = process.env.PORT || 3000;

async function main() {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  await createConnection({
    database: './db.sqlite',
    type: 'sqlite',
    entities: [join(__dirname, './entities/*')],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logger: 'simple-console',
    logging: true,
    synchronize: true,
  }).then(() => {
    useExpressServer(server, {
      routePrefix: '/api/v1',
      controllers: [__dirname + '/controllers/*.ts'],
    });
    server.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
}

main();
