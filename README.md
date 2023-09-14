# Node-TS-Template
This project gives you barebones setup of node and typescript for nodejs projects.

## Manual Setup
Please follow the below steps to manually setup this project. 

Make sure node is installed in your system, run the below command to check your node version and you would get your node version in 'vXX.XX.XX' format like below.

```console
node -v
v16.16.0
```

Initialize a node project

```console
npm init -y
```

Install the project dependencies

```console
npm i -D typescript @types/node tsup concurrently nodemon
```

Create a 'src' folder and 'index.ts' file in it.

Update the package.json scripts with below commands

```
{
    "build": "tsup src",
    "start": "node dist/index.js",
    "dev": "concurrently \"tsup src --watch\" \"nodemon dist/index.js\""
}
```

Use the below command to run the project in development mode.

```console
npm run dev
```

Use the below command to build the project and deploy the resulting dist folder.

```console
npm run build
```