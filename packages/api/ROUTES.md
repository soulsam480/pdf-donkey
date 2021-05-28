## ROUTES 5/28/2021

PATH : **/DONKEY/V1/AUTH/REGISTER** **||** METHOD: **POST** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/register","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **/DONKEY/V1/AUTH/LOGIN** **||** METHOD: **POST** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/login","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **/DONKEY/V1/AUTH/GOOGLE** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/google","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"authenticate","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/AUTH/GOOGLE/REDIRECT** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/auth/google/redirect","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"authenticate","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/PDF/GENERATE** **||** METHOD: **POST** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/pdf/generate","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/:ID** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/** **||** METHOD: **POST** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"post"}],"methods":{"post":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/:ID** **||** METHOD: **PUT** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"put"}],"methods":{"put":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/:ID** **||** METHOD: **DELETE** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":23}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"delete"}],"methods":{"delete":true}}}
```
          
PATH : **/DONKEY/V1/TEMPLATE/USER/:ID** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[{"name":"id","optional":false,"offset":29}],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/template/user/:id","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/TOKEN/REFRESH** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/token/refresh","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/USER/** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
PATH : **/DONKEY/V1/USER/** **||** METHOD: **PATCH** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"textParser","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"patch"}],"methods":{"patch":true}}}
```
          
PATH : **/DONKEY/V1/USER/KEY** **||** METHOD: **GET** 
- Detailed:
```json
 {"name":"bound dispatch","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"route":{"path":"/donkey/v1/user/key","stack":[{"name":"routeGuard","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"<anonymous>","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"},{"name":"routeHandler","keys":[],"regexp":{"fast_star":false,"fast_slash":false},"method":"get"}],"methods":{"get":true}}}
```
          
