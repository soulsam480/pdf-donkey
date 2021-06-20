---
title: Backend
description: Donkey backend reference.
---
# Backend reference
Donkey backend is built on a loosely-coupled service-controller architecture. The code style does violate the recommended service-controller pattern, but I have plans to improve it in future. The code is entirely written in TypeScript with some custom utility types. Any sugegstion on improving the code is appreciated and can be suggested by opening an issue/pr. 

::: warning Note
Donkey is in heavy development. Major code change can be expected.
:::


## Stack
Donkey's backend stack is built with the following technologies.

- [expressjs](https://expressjs.com/) - server
- [routing-controllers](https://github.com/typestack/routing-controllers) - routing and middlewares
- postgresql - db
- [typeorm](https://typeorm.io) - ORM
- [bcrypt](https://www.npmjs.com/package/bcrypt) and [jsonwebtoken](https://jwt.io/) - for dispatching JWTs
- [passportjs](https://passportjs.org) and [passport-google-oauth2](https://passportjs.org/packages/passport-google-oauth20/) - for OAuth
- [liquidjs](https://liquidjs.com/) - html/liquid template rendering engine
- [html-pdf](https://github.com/marcbachmann/node-html-pdf) - pdf renderer
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) - rate limiting

## File reference
Donkey backend code can be foud at [/packages/api](https://github.com/soulsam480/pdf-donkey/tree/master/packages/api). The file structure is
- `src/controllers` - Routing controllers for specific routes
- `src/entities` - DB models/entities
- `src/middlewares` - Express middlewares
- `src/migrations` - DB migrations
- `src/services` - Services for controllers to interact with DB
- `src/types` - Utility types
- `src/utils` - Utility functions, constants etc.
- `src/index.ts` - Server entry

## Route reference
A somewaht more detailed `routes` reference can be found at [/packages/api/ROUTES.md](https://github.com/soulsam480/pdf-donkey/blob/master/packages/api/ROUTES.md)

- `/donkey/v1/template/`  --   **`post`** 
- `/donkey/v1/template/:id`  --   **`put`** 
- `/donkey/v1/template/:id`  --   **`delete`** 
- `/donkey/v1/token/refresh`  --   **`get`** 
- `/donkey/v1/user/`  --   **`get`** 
- `/donkey/v1/user/`  --   **`patch`** 
- `/donkey/v1/user/key`  --   **`get`** 
- `/donkey/v1/auth/register` --  **`post`** 
- `/donkey/v1/auth/login` --  **`post`** 
- `/donkey/v1/auth/google` --  **`get`** 
- `/donkey/v1/auth/google/redirect` --  **`get`** 
- `/donkey/v1/pdf/generate` --  **`options`** 
- `/donkey/v1/pdf/generate` --  **`post`** 
- `/donkey/v1/pdf/:id` --  **`post`** 

## Env variables
- REFRESH_TOKEN_SECRET  --  __`string`__
- ACCESS_TOKEN_SECRET  --  __`string`__
- GCLIENT_ID  --  __`string`__ - `Google OAuth client ID`
- GCLIENT_SECRET  --  __`string`__ - `Google OAuth client secret`
- HASH_SALT  --  __`number`__
- PGRES_USER  --  __`string`__
- PGRES_PASS  --  __`string`__
- PGRES_HOST  --  __`string`__
- PGRES_DB  --  __`string`__

::: tip Note
While deploying you need to inject a separate `PROD` variable which is a boolean, otherwise the `auth` and `pdf` services will fail.
:::