import { createExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { join } from 'path';
const PORT = process.env.PORT || 3000;

async function main() {
  await createConnection({
    database: './db.sqlite',
    type: 'sqlite',
    entities: [join(__dirname, './entities/*')],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logger: 'simple-console',
    logging: true,
    synchronize: true,
  }).then(() => {
    const app = createExpressServer({
      routePrefix: '/api/v1',
      controllers: [__dirname + '/controllers/*.ts'],
    });
    const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
}

main();
