<img src="https://socialify.git.ci/soulsam480/pdf-donkey/image?description=1&descriptionEditable=On%20demand%20pdf%20generation%20with%20custom%20templates%2C%20variables.%20PDF%20monkey%20but%20open-source%20with%20support%20for%20self%20hosting%2C&font=Bitter&language=1&logo=https%3A%2F%2Fdonkey.sambitsahoo.com%2Fdonkey-trans.png&owner=1&pattern=Circuit%20Board&theme=Dark" alt="pdf-donkey" width="100%" height="100%" />
 
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
- PDF Generation
- Custom style

Projected:
- UI refining
- more..
### Stack

api:
- Node v14.x
- Express
- SQLite
- Typeorm
- Typescript
- Route Controllers
- Auth (JWT)/Google OAuth2

app:
- Vite
- React 
- React router
- zustand
- Typescript
- Tailwind CSS

### Run it locally

#### Pre-requisites 
> You need to have `yarn` installed on your machine as this is a monorepo and uses [`yarn woorkspaces`](https://classic.yarnpkg.com/en/docs/workspaces/).
> create a `.env` file in packages/app and add `VITE_API=http://localhost:3000`
> crate a `.env` file in packages/api and add `REFRESH_TOKEN_SECRET`,`ACCESS_TOKEN_SECRET` with any random value.

- clone `git clone https://github.com/soulsam480/pdf-donkey.git`
- install deps
```bash
yarn
```
- Install postgres and add `.env` variables.
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

sudo -u postgres createuser --interactive
# name: username
# password: userpassword
# hit yes on all questions

createdb db_name # or your db name must be same with linux user name
# or sudo -u postgres createdb your_db_name

# needed to create extensions
grant all privileges on database db_name to user_name 

# change user password for new postgres user
alter user user_name with password 'new_password'

# to use postgres properly in ubuntu we need to add a user 
sudo adduser user_name # or your username, should be same with postgres user-role and db name

sudo -u user_name psql # log in to postgres with username

# install uuid extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

```
- Add .env variables
```bash
PGRES_USER=
PGRES_PASS=
PGRES_HOST=
PGRES_DB=
```
- Run it
```bash
# start server
yarn serve # starts both app and api

# build for deployment
yarn build
```

Any contributions are welcome. Reach me on [soulsam480@hotmail.com](mailto:soulsam480@hotmail.com)
