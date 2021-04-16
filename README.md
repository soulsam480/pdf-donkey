## PDF Donkey

PDF monkey but open-souce.

Purely hobby project. Don't know if it'll make it to a real server or not.

### Stack

api:
- Node v14.x
- Express
- SQLite (Will be postgres if deployed)
- Typeorm
- Typescript
- Route Controllers
- Auth (JWT)

app:
- React 
- React router
- Shoyo

### Run it locally

#### Pre-requisites 
> You need to have `yarn` installed on your machine as this is a monorepo and uses [`yarn woorkspaces`](https://classic.yarnpkg.com/en/docs/workspaces/).
> create a `.env` file in packages/app and add `VITE_API=http://localhost:3000`
> crate a `.env` file in packages/api and add `REFRESH_TOKEN_SECRET`,`ACCESS_TOKEN_SECRET` with any random value.

- clone `git clone https://github.com/soulsam480/pdf-donkey.git`
- install deps
```bash
yarn

# start server
yarn start

# build for deployment
yarn build

```

Any contributions are welcome. Reach me on [soulsam480@hotmail.com](mailto:soulsam480@hotmail.com)
