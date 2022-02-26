# GTI525 EQUIPE 10

## VS Code Extensions 
- Vetur - since we are not using typescript)
- ESLint - for linting warning errors

## Browser Add-ons/Extensions
- [Chrome Vue.js Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- [Firefox Vue.js Devtools](https://addons.mozilla.org/en-CA/firefox/addon/vue-js-devtools/)

## Setting up and running dev server
delete `node_modules` folder if exists

Then install dependencies
```bash
npm run install-full
# or 
npm run install-all
```

then you can run dev server with
```bash
npm run dev
```

---
## Running production server (Demo-ing)
Build the Vue app with
```bash
npm run build
```

Make sure `.env` file has port set to 8000
```env
PORT=8000
```

Run production server with 
```bash
npm run start-windows # If on windows machine.
# or
npm run start-linux   # If on a linux os (should also work on MacOS)
```

#### You can then access the website on http://localhost:8000/

---
## How it works

When running npm run dev the server will load on port 8000 and the vite dev server for the vue app will load on port 3000.

(Note: port 3000 is only for vue dev server for developement purposes, it wont be used for demoing)

All api fetch called from the vue app should be made to http://localhost:8000/api/{insert-route-here}/ 

For "production" mode (I.E. demo the lab for class) Vue app will be compiled with `npm run build` <br>
then server will be run with `npm run start-windows` or `npm run start-linux`  <br>
this will run server on port 8000 which will serve the compiled vue app located in `root_dir/client/dist` all on the same port (8000) on route `http://localhost:8000`

---
 ## Installing packages for the Vue app.
 
 In your terminal within VS Code make sure you `cd` into the client folder before.
 ```bash
 cd client
 ```
 
 then you can run npm from that subfolder to add packages to the vite/vue3.js app
 ```bash
 npm install [package-name]
 ```
 
 Aftwards you can cd back to root directory.
 ```bash
 cd ..
 ```

---
## All Scripts


To run only the ExpressApp server in Dev mode. 
```bash
npm run server
```


To run only the Vue App Located in the `/client` directory in Dev mode 
```bash
npm run client
# or
npm run vite
# or 
npm run vue-dev
```


To run both servers concurrently used for developement <br>
The Vue App is avaiable on http://localhost:3000/ <br>
While the expressApp back will always be on http://localhost:8000/ <br>
(this is why all api calls in vue app should be written for port 8000 despite the dev server running on port 3000)
```bash
npm run dev
```


To run the ExpressApp server not in Dev mode but not in prodcution either (probably useless hoenstly)
```bash
npm run start
```


To run the server in production mode for a given OS
```bash
npm run start-windows
# or 
npm run start-linux
```


To build the Vue App and have it be ready for production/demo should be run before running `npm run start-windows` / `npm run start-linux`
```bash
npm run build
```


To install package.json dependancies for ExpressApp <br>
(Alternatively : you can use npm install)
```bash
npm run install:server
```


To install package.json dependancies for the Vue App <br>
(Alternatively : you can `cd client` then `npm install` from the client folder) <br>
(Note : To install new packages you must `cd client` then `npm install [package-name]`)
```bash
npm run install:client
```


To run npm install on both ExpressApp and Vue App
```bash
npm run install-all
# or
npm run install-full
```


For Linting
```bash
npm run lint      # to check for lint errors from the vue.
npm run ling-fix  # to auto fix all linting errors.
```
