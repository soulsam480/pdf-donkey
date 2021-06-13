## ROUTES 6/13/2021

PATH : **`/donkey/v1/auth/register`** **||** METHOD: **`post`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/register","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **`/donkey/v1/auth/login`** **||** METHOD: **`post`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/login","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **`/donkey/v1/auth/google`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/google","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"authenticate","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/auth/google/redirect`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/google/redirect","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"authenticate","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/pdf/generate`** **||** METHOD: **`options`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/pdf/generate","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"options"},{"name":"corsMiddleware","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"options"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"options"}],"methods":{"options":true}}}
```
          
PATH : **`/donkey/v1/pdf/generate`** **||** METHOD: **`post`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/pdf/generate","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"corsMiddleware","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **`/donkey/v1/pdf/:id`** **||** METHOD: **`post`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":18}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/pdf/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **`/donkey/v1/template/`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/template/:id`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/template/`** **||** METHOD: **`post`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **`/donkey/v1/template/:id`** **||** METHOD: **`put`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"}],"methods":{"put":true}}}
```
          
PATH : **`/donkey/v1/template/:id`** **||** METHOD: **`delete`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"}],"methods":{"delete":true}}}
```
          
PATH : **`/donkey/v1/token/refresh`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/token/refresh","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/user/`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **`/donkey/v1/user/`** **||** METHOD: **`patch`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"}],"methods":{"patch":true}}}
```
          
PATH : **`/donkey/v1/user/key`** **||** METHOD: **`get`** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/key","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
