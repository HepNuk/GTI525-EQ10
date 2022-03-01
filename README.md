# GTI525 EQUIPE 10

## VS Code Extensions 
- Vetur - since we are not using typescript)
- ESLint - for linting warning errors
- Prettier ESLint - for autoformating on save 
	Make sure to set Prettier ESLint as default formatter for it to work (It only works for the vue project at the momment)
 
![Enable Prettier ESLint as Default formater](https://i.imgur.com/vkvrTIo.png)

## Browser Add-ons/Extensions
- [Chrome Vue.js Devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=en)
- [Firefox Vue.js Devtools](https://addons.mozilla.org/en-CA/firefox/addon/vue-js-devtools/)

## Setting up and running dev server
delete `node_modules` folder from `root`. `/client`  and `/server` if they exist and you have problemes

Then install dependencies
```bash
npm run install:all

# or

npm install
npm run install:client
npm run install:server

# or you can manually `npm install` from corressponding folders
# example : 
cd client
npm install
```

then you can run the vue dev server with
```bash
# Vue sev server 
npm run dev
```

and for the expressApp server you can run in a seperate terminal
```bash
# expressApp dev server
npm run server
```

---
## Running production server (Demo-ing)
Build the Vue app with
```bash
cd client
npm run build
```

Make sure `.env` file has port set to 8000
```env
PORT=8000
```

Run production server with 
```bash
npm run start:windows # If on windows machine.
# or
npm run start:linux   # If on a linux os (should also work on MacOS)
```

#### You can then access the website on http://localhost:8000/

---
## How it works

When running npm run dev the server will load on port 8000 and the vite dev server for the vue app will load on port 3000.

(Note: port 3000 is only for vue dev server for developement purposes, it wont be used for demoing)

All api fetch called from the vue app should be made to http://localhost:8000/api/{insert-route-here}/ 

For "production" mode (I.E. demo the lab for class) Vue app will be compiled with `npm run build` <br>
then server will be run with `npm run start:windows` or `npm run start:linux`  <br>
this will run server on port 8000 which will serve the compiled vue app located in `root_dir/server/public` all on the same port (8000) on route `http://localhost:8000`

---
 ## Installing packages for the Vue app.
 
 In your terminal within VS Code make sure you `cd` into the client folder before.
 ```bash
 # change directory to the view app folder `/client`
 cd client

 # then you can install any package you want for the vue app
 npm install [package name here]
 ```

---
## All Scripts

To run only the ExpressApp localted in the `/server`  directory server in Dev mode. 
```bash
npm run server
```

To run only the Vue App Located in the `/client` directory in Dev mode 
```bash
npm run dev
```

To run the ExpressApp server not in Dev mode but not in prodcution either (probably useless hoenstly)
```bash
npm run start
```

To run the server in production mode for a given OS
```bash
npm run start:windows
# or 
npm run start:linux
```

To install dependencies 
```bash
npm run install:server # for expressApp
npm run install:client # for vue app
npm install # to install dev dependencies needed for Linting/Prettier and more.

npm run install:all # to run all 3 of the above
```

For Linting Vue app
```bash
npm run lint      # to check for lint errors from the vue.
npm run ling-fix  # to auto fix all linting errors.
```
