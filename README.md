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

- clone `git clone https://github.com/soulsam480/pdf-donkey.git`
- go to `/api` and create `.env` file with two variables `REFRESH_TOKEN_SECRET` and `ACCESS_TOKEN_SECRET` with any value.
- install deps
```bash
cd api
yarn

cd app
yarn

```
- start servers and open preview
```bash
cd app
yarn dev

cd api
yarn serve

```

Any contributions are welcome. Reach me on [soulsam480@hotmail.com](mailto:soulsam480@hotmail.com)