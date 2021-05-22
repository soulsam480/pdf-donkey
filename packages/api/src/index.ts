import * as dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({
  path: join(__dirname, '../.env'),
});
import {
  Action,
  // getMetadataArgsStorage,
  useExpressServer,
} from 'routing-controllers';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import express from 'express';
import { verify } from 'jsonwebtoken';
import { User } from './entities/user';
import cors from 'cors';
import { Strategy } from 'passport-google-oauth2';
require('tsconfig-paths/register');
const PORT: string | number = process.env.PORT || 3000;
import rateLimiter from 'express-rate-limit';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { logApiRoutes } from './utils';
// import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import { routingControllersToSpec } from 'routing-controllers-openapi';
// const { defaultMetadataStorage } = require('class-transformer/cjs/storage');
// import * as swaggerUiExpress from 'swagger-ui-express';
// import { version } from '../../../package.json';
passport.use(
  new Strategy(
    {
      clientID: process.env.GCLIENT_ID as string,
      clientSecret: process.env.GCLIENT_SECRET as string,
      callbackURL: !process.env.PROD
        ? 'http://localhost:3000/donkey/v1/auth/google/redirect'
        : 'https://apis.sambitsahoo.com/donkey/v1/auth/google/redirect',
      passReqToCallback: true,
    },
    async (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any,
    ) => {
      const userRepo = getRepository(User);
      const user = await userRepo.findOne({
        where: [{ ga_id: profile.id }, { email: profile.email }],
      });
      if (!user) {
        userRepo
          .create({
            name: profile.displayName,
            email: profile.email,
            ga_id: profile.id,
            is_active: true,
            username: profile.email.split('@')[0],
            password: await bcrypt.hash(uuid(), 10),
          })
          .save()
          .then((user) => done(null, user));
        return;
      }
      if (!user.ga_id)
        await userRepo.update({ email: user.email }, { ga_id: profile.id });
      done(null, user);
    },
  ),
);
passport.serializeUser((user, cb) => {
  cb(null, (user as any).id);
});

passport.deserializeUser(async (id: string, cb) => {
  const user = await getRepository(User).findOne({ where: { id: id } });
  if (!user) return;
  cb(null, user);
});
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
  server.use(
    cors({
      origin: [
        'http://localhost:4001',
        'https://donkey.sambitsahoo.com',
        'http://localhost:5000',
      ],
    }),
  );
  server.use('/donkey/v1/auth/', limiter);
  server.use(passport.initialize());
  await createConnection({
    database: join(__dirname, '../db.sqlite'),
    type: 'better-sqlite3',
    entities: [join(__dirname, './entities/*')],
    migrations: [join(__dirname, './migrations/*')],
    logger: /*process.env.PROD ? undefined : */ 'advanced-console',
    logging: /*process.env.PROD ? false :*/ true,
    synchronize: false,
  }).then(async (conn) => {
    await conn.query('PRAGMA foreign_keys=OFF;');
    await conn.runMigrations();
    await conn.query('PRAGMA foreign_keys=ON;');
    useExpressServer(server, {
      routePrefix: '/donkey/v1',
      controllers: [__dirname + '/controllers/*{.ts,.js}'],
      currentUserChecker: async (action: Action) => {
        const accessToken = action.request.headers['access-token'].split(
          'Bearer ',
        )[1] as string;
        const data = <{ userId: string }>(
          verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string)
        );
        return conn.getRepository(User).findOne({ id: data.userId });
      },
    });
    if (!process.env.PROD) {
      logApiRoutes(server._router.stack, PORT);
      // const schemas = validationMetadatasToSchemas({
      //   classTransformerMetadataStorage: defaultMetadataStorage,
      //   refPointerPrefix: '#/components/schemas/',
      // });
      // const storage = getMetadataArgsStorage();
      // const spec = routingControllersToSpec(
      //   storage,
      //   {
      //     routePrefix: '/donkey/v1',
      //     controllers: [__dirname + '/controllers/*{.ts,.js}'],
      //   },
      //   {
      //     components: {
      //       schemas,
      //       securitySchemes: {
      //         basicAuth: {
      //           scheme: 'Api Key',
      //           type: 'apiKey',
      //         },
      //       },
      //     },
      //     info: {
      //       description: 'Generated with `routing-controllers-openapi`',
      //       title: 'PDF Donkey API',
      //       version: version,
      //       license: {
      //         name: 'MIT',
      //       },
      //       contact: {
      //         email: 'soulsam480@hotmail.com',
      //         name: 'Sambit Sahoo',
      //         url: 'https://sambitsahoo.com',
      //       },
      //     },
      //   },
      // );

      // server.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
    }
    server.listen(PORT, () =>
      console.log(`Listening on http://localhost:${PORT}`),
    );
  });
}

main();
