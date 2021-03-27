import { createExpressServer } from 'routing-controllers';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
const PORT = process.env.PORT || 3000;

async function main() {
  await createConnection({
    database: '../db.sqlite',
    type: 'sqlite',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
    logger: 'advanced-console',
    logging: true,
  }).then(() => {
    const app = createExpressServer({
      controllers: [__dirname + '/controllers/*.ts'],
    });
    const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  });
}

main();
