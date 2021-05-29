## PDF Donkey

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/soulsam480/pdf-donkey/master)  ![GitHub](https://img.shields.io/github/license/soulsam480/pdf-donkey)  ![Website](https://img.shields.io/website?url=https%3A%2F%2Fdonkey.sambitsahoo.com) [![Netlify Status](https://api.netlify.com/api/v1/badges/13df9f66-77fd-4b37-92ca-95b35918d2de/deploy-status)](https://app.netlify.com/sites/pdf-donkey/deploys)

PDF monkey but open-souce.

<a href="https://www.producthunt.com/posts/pdf-donkey?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-pdf-donkey" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=297751&theme=dark" alt="PDF Donkey - Open-source PDF Monkey alternative. | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>

## Status

> Donkey is pre-alpha.

[Changelogs](./CHANGELOG.md)

[Donkey API routes (not perfect)](./packages/api/ROUTES.md)

App url https://donkey.sambitsahoo.com

Features:
- Google OAuth2 login/ JWT Auth
- Template CRUD
- Rich template editing
- Template preview

Projected:
- PDF Generation
- more..
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
