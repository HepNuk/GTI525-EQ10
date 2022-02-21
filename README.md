# GTI525 EQUIPE 10

## Setting up and running dev server
delete `node_modules` folder if exists

Then install dependencies
```bash
npm run install-full
```

then you can run dev server with
```bash
npm run dev
```

## How it works

When running npm run dev the server will load on port 8000 and the vite dev server for the vue app will load on port 3000.

(Note: port 3000 is only for vue dev server for developement purposes, it wont be used for demoing)

All api fetch called should be made to http://localhost:8000/api/{insert-route-here}/ 

For "production" mode (I.E. demo the lab for class) Vue app will be compiled with `npm run build` <br>
then server will be run with `npm run start-windows` or `npm run start-linux`  <br>
this will run server on port 8000 which will serve the compiled vue app located in `root_dir/client/dist` all on the same port (8000) on route `http://localhost:8000`

<br>

## Scripts
### To check lint 
```bash
npm run lint
```

### To Fix linting errors/warnings
```bash
npm run lint-fix
```

### To run a production version 
```bash
npm run build
```
then if windows
```bash
npm start-windows
```
or if linux or mac
```bash
start-linux
```
Recommended Extensions: 
- Vetur 
- ESLint
