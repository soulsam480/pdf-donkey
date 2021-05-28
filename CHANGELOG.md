#### 0.1.1 (2021-05-28)

##### Build System / Dependencies

*  fix bug in runtime ([342d486b](https://github.com/soulsam480/pdf-donkey/commit/342d486b6d6e342b027ce053d30606f0e04ea42c))
*  deploy prep ([5254018e](https://github.com/soulsam480/pdf-donkey/commit/5254018e04474bb003c6817f87b4061560e37b20))
*  try netlify deploy ([d1e38fbf](https://github.com/soulsam480/pdf-donkey/commit/d1e38fbf03dc5feba11c5fea464874ea2db8ebc5))

##### Chores

*  fix conflict ([d3a0da82](https://github.com/soulsam480/pdf-donkey/commit/d3a0da8251720958b1a8dcee46ba501e3a838103))
*  add db to .gitignore ([18b87af4](https://github.com/soulsam480/pdf-donkey/commit/18b87af4d0353db59f18af81f2b973e9d8f39ec6))
*  now a monorepo ([03f35633](https://github.com/soulsam480/pdf-donkey/commit/03f35633a7b5ca6a9f51ac7b7d05526845745d85))

##### Documentation Changes

*  add netlify build badge ([5d1a14be](https://github.com/soulsam480/pdf-donkey/commit/5d1a14beba8d2668f17e93d3fa527624aade9520))
*  update readme, add API routes listing ([fbaff82b](https://github.com/soulsam480/pdf-donkey/commit/fbaff82bc0c8215c538cb1f38b7aa5cf25e5e9a3))
*  update readme ([5c8f6084](https://github.com/soulsam480/pdf-donkey/commit/5c8f60843e12326938ae01414dc17f5a7718727e))
*  update readme ([febda93f](https://github.com/soulsam480/pdf-donkey/commit/febda93fc9c12253b345d57d9b948cb20c814ddc))
*  update readme ([4573132c](https://github.com/soulsam480/pdf-donkey/commit/4573132cfe7fdefffacad4f225bc0dfb9edd80b2))
*  update README ([bd0318bb](https://github.com/soulsam480/pdf-donkey/commit/bd0318bb8ae43cc1b086322e7b7dbda23e90a7d5))
*  update README ([866addf2](https://github.com/soulsam480/pdf-donkey/commit/866addf2bff3653ea963ddd6ed903ded99f686fc))
*  add small comments ([ca234008](https://github.com/soulsam480/pdf-donkey/commit/ca234008ae9b71a6bf6f5a76664a8114215db057))
*  update ([fbe7b00c](https://github.com/soulsam480/pdf-donkey/commit/fbe7b00c45f9c59d026628c92d6698c1220ace87))
* **api:**
  *  move route generator to separate file ([fd0781ac](https://github.com/soulsam480/pdf-donkey/commit/fd0781ac19481f68ce7cf6cb3cb191ab20ff18c8))
  *  update routes ([3b25faaf](https://github.com/soulsam480/pdf-donkey/commit/3b25faaf1b8f488ec1386073c072848cdebf9d06))

##### New Features

* **api:**
  *  added rate-limiter to pdf generation endpoint ([17294eae](https://github.com/soulsam480/pdf-donkey/commit/17294eae2f3fd653b92d39f45b9ce505bc3e9367))
  *  added pdf generation using API keys, ts types in a separate file. ([6f945edb](https://github.com/soulsam480/pdf-donkey/commit/6f945edb0a13c20bea6b81156ea83eae8d05e83a))
  *  add user API key generation ([c46408e3](https://github.com/soulsam480/pdf-donkey/commit/c46408e33ea0eecd875e2183eb1cbdd13552e161))
  *  add error messages as constants ([11220db5](https://github.com/soulsam480/pdf-donkey/commit/11220db5f690e88d965b382db1a6189d3d389446))
  *  add user profile update ([e4d42355](https://github.com/soulsam480/pdf-donkey/commit/e4d42355567e034edd51a079fcf9549cb93969e5))
  *  add support for tenplate data and meta ([a757b4fd](https://github.com/soulsam480/pdf-donkey/commit/a757b4fd30631b66f40277adcd78b218bc286224))
  *  set user ga_id if existing user uses google auth ([edc8bc63](https://github.com/soulsam480/pdf-donkey/commit/edc8bc63da5410eb2ff28d44dd19b3214d2dc04d))
  *  added google oauth2 ([d2795956](https://github.com/soulsam480/pdf-donkey/commit/d2795956940dcb3e8f7aca30fd6a908bf64edd75))
  *  user persisted, feat(api): log paths ([e5b0274b](https://github.com/soulsam480/pdf-donkey/commit/e5b0274b0b2d395ef9d3039091e9daa0c0cfd841))
  *  user auth, middleware ([86624c07](https://github.com/soulsam480/pdf-donkey/commit/86624c07b97462adf4a4ac82746b555f4bd4d3eb))
  *  template controllers, pdf preview service, liquidjs, ([46a63cdc](https://github.com/soulsam480/pdf-donkey/commit/46a63cdc28d6278ffe96ab801080f6052244d799))
  *  added controllers, basic entities ([095c7ca6](https://github.com/soulsam480/pdf-donkey/commit/095c7ca6d1a25e968cb9e1f7aca39c393ff0defa))
* **app:**
  *  add user API key generation ([4b07347f](https://github.com/soulsam480/pdf-donkey/commit/4b07347fe737ddd94ec2a6e0e930e033a1625bdd))
  *  user profile update ([f668921b](https://github.com/soulsam480/pdf-donkey/commit/f668921b75fe31dc567c9b2d9b8840b4bdaca940))
  *  added template test data input modal for testing the template ([5cc19609](https://github.com/soulsam480/pdf-donkey/commit/5cc1960958a2113c83d5ef46666ebcb5b48f6fdc))
  *  added syntax highlighting and auto formatting to create template modal ([768acb35](https://github.com/soulsam480/pdf-donkey/commit/768acb3557cacbeecbc42f0f5b29339d52b55555))
  *  minor UI updates ([2fc78612](https://github.com/soulsam480/pdf-donkey/commit/2fc78612fc68fe75417d815c28eb2ed8c4fcd6f4))
  *  add Donkey version to navBar ([8194d788](https://github.com/soulsam480/pdf-donkey/commit/8194d78860b4f670a5d167c40bb346be837ceb33))
  *  added auto formatting in code mode while editing templates ([67fae7de](https://github.com/soulsam480/pdf-donkey/commit/67fae7debcb0f90e2fb9e02b8cc09c36bdfccd93))
  *  split vendor chunks and module chunks ([3282a4ce](https://github.com/soulsam480/pdf-donkey/commit/3282a4ce5f2aed5cf9d37231f576ed237dde4a04))
  *  added pagebreak ([8adea77c](https://github.com/soulsam480/pdf-donkey/commit/8adea77cf8bb1dec13be0c74f3f944ac5892c2dd))
  *  added notifications, classname helper minor UI updates ([3712836a](https://github.com/soulsam480/pdf-donkey/commit/3712836ac51fb56b0a547bdc5ff435b3e5c18892))
  *  Moved to tinymce for wysiwyg editor ([9030ab35](https://github.com/soulsam480/pdf-donkey/commit/9030ab358526a21761fa2c6e45e5ae3fa6609f88))
  *  add full page loader, added reactive donkey APi ([3246ddb5](https://github.com/soulsam480/pdf-donkey/commit/3246ddb594f3720cd3cf887ba9bca481669ebcd2))
  *  added basic landing page ([e944eb73](https://github.com/soulsam480/pdf-donkey/commit/e944eb736becc2a0259b7899bf0b074b5b695fe5))
  *  added google oauth2 ([0a28aac9](https://github.com/soulsam480/pdf-donkey/commit/0a28aac9fe974d7577e9303ff5b08f244a6aac44))
  *  moved to tailwindcss for styling ([972b9a80](https://github.com/soulsam480/pdf-donkey/commit/972b9a80ec8f265fcb61f881f1a47f1879f75e7f))
  *  new color theme, Better listing UI ([e29d155a](https://github.com/soulsam480/pdf-donkey/commit/e29d155ac06d03240cadae0d0b4eb71af7667d71))
  *  added redirects, template listing UI, SWR for data fething, more UI updates ([ad8d0b98](https://github.com/soulsam480/pdf-donkey/commit/ad8d0b98f94acd3898f6b66683b9e3de48fc89a6))
  *  moved to zustand for state management, feat(api): moved to ts-node-dev for dev preview, bug fixes ([aa2af188](https://github.com/soulsam480/pdf-donkey/commit/aa2af1888fd9c301628784210980154edba59f09))
  *  add login, register, user state, feat(api): add refresh token endpoint ([ce5c0e92](https://github.com/soulsam480/pdf-donkey/commit/ce5c0e922ece0ea77c494f7ea592a6e950f8ca02))
  *  add path, state, navbar ([066c5222](https://github.com/soulsam480/pdf-donkey/commit/066c5222c50e99c1bd188ca352ea2bdb3c278d01))
  *  react app init ([e551c20f](https://github.com/soulsam480/pdf-donkey/commit/e551c20fb8d17a6ef316a6499e88c910c9065fc1))
*  change label ([fd2f90fd](https://github.com/soulsam480/pdf-donkey/commit/fd2f90fd272352eeebc190d87208b56f5edb8973))
*  add user dropdown menu ([621fb894](https://github.com/soulsam480/pdf-donkey/commit/621fb89440065ea66e049e270cd12dc6918478f2))
*  add PWA caching ([83d5dd82](https://github.com/soulsam480/pdf-donkey/commit/83d5dd8285d640377e194e34196bf7ec806e58e8))
*  port modal to twcss ([b2c5c8c7](https://github.com/soulsam480/pdf-donkey/commit/b2c5c8c742cb93f2f7a1b49240749030c7a893a0))
*  add template creation ([7a869cd4](https://github.com/soulsam480/pdf-donkey/commit/7a869cd481eefe5ef09d2cbc1c95f1a2d009b886))
* **app,api:**
  *  add typeorm migrations, added rich text editor ([26549ab0](https://github.com/soulsam480/pdf-donkey/commit/26549ab0964070a1fad00fae9aaa8403282e9885))
  *  add code splitting, change sqlite driver to better-sqlite3 ([f0c0ed48](https://github.com/soulsam480/pdf-donkey/commit/f0c0ed483e942c176ffae04845e1779dbea20bbf))
  *  timestamps for update, username login, template editing with syntax highlighting, more UI updates ([fbe70499](https://github.com/soulsam480/pdf-donkey/commit/fbe704995d599ee041dfd99a74625aabb4af3a13))

##### Bug Fixes

* **api:**
  *  change cors to allow all origins ([8684bcdc](https://github.com/soulsam480/pdf-donkey/commit/8684bcdc9e869fd197b6e769e8aab74cc35383f7))
  *  don't send API key in user data ([afeb0096](https://github.com/soulsam480/pdf-donkey/commit/afeb0096f685e529eb4fbbf24c2fe4310e8e3ec3))
  *  fix service response errors, bugs, fix(app): register handler ([4a3d78e5](https://github.com/soulsam480/pdf-donkey/commit/4a3d78e5af20615e69053f91e5b7b0c9c5c93148))
* **app:**
  *  close nav context when clicked on an element ([d613a624](https://github.com/soulsam480/pdf-donkey/commit/d613a6247940feddcd8d12cb61bb9d781b30d204))
  *  avoid effect on template mount in code mode ([6356c541](https://github.com/soulsam480/pdf-donkey/commit/6356c541125577e9a1c49265d2ddc909ccc3da57))
*  token persistence WIP ([0afa3363](https://github.com/soulsam480/pdf-donkey/commit/0afa3363839cab035d9311108cd204e3218da082))
*  remove index db ([eddd3439](https://github.com/soulsam480/pdf-donkey/commit/eddd3439723dca4c7b924205d9df5e286ded0a51))
*  remove index db ([1fe186b4](https://github.com/soulsam480/pdf-donkey/commit/1fe186b4085f80c4ef10ea89cc60ccc1931520aa))
*  netlify redirects ([3af6e8ed](https://github.com/soulsam480/pdf-donkey/commit/3af6e8eda1e1dd3d1ae72418fae17c43616b0755))
*  .env loading, env files ([4204a61d](https://github.com/soulsam480/pdf-donkey/commit/4204a61df695e219540f685203ef5e45c16ae5a3))
*  something ([d45b32b4](https://github.com/soulsam480/pdf-donkey/commit/d45b32b4cefd8ffb5f3d320a4262017ea6090a2c))
*  runtime errors ([ae6ebc4e](https://github.com/soulsam480/pdf-donkey/commit/ae6ebc4eac459aa7444ca1d7f2b63c1a62c9315a))
*  store ([0e6c643b](https://github.com/soulsam480/pdf-donkey/commit/0e6c643bef5b8e16b77fc13ece8f391b58164fdf))
* **app,api:**  fix updatedAt error, scope requests to specific user ([7e9ecdf4](https://github.com/soulsam480/pdf-donkey/commit/7e9ecdf47c7f27b55c20f34365bf678b468f7a33))

##### Other Changes

* **api:**  better error handling ([1745e290](https://github.com/soulsam480/pdf-donkey/commit/1745e290b9b5c1ea4a466853489bc3ea9a5831ee))
*  merge master ([20a83571](https://github.com/soulsam480/pdf-donkey/commit/20a83571cb6d028ff8cfd45af95a48391793df69))
* soulsam480/pdf-donkey merge ([5b594fd0](https://github.com/soulsam480/pdf-donkey/commit/5b594fd0b7c5ee1026f3debf202c7afd9adb0b1e))

##### Refactors

* **app,api:**  Better error handling in user endpoints ([c68b4538](https://github.com/soulsam480/pdf-donkey/commit/c68b453837edba1c22f6d22d36ebe98eb7328c6d))
*  make husky run after commit ([6d77eb0b](https://github.com/soulsam480/pdf-donkey/commit/6d77eb0be75ef833d17a9c10513be2dd5db61303))
*  moved to semantic token headers **Bearer token** format ([fd6d7aa9](https://github.com/soulsam480/pdf-donkey/commit/fd6d7aa9d24774c06b52bc6a2216c33bb4a13fb7))
* **api:**  move template controller methods to try/catch blocks ([e2e2a0f2](https://github.com/soulsam480/pdf-donkey/commit/e2e2a0f221677479fff743f43e2077dae8ef57b0))

