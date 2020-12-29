// comportamiento de nuestra app (express, instancia db, inyección de dependencias, log de errores, etc)

// antes de ejecutar cualquier código, vamos a definir las variables de proceso de nuestra app
// si está definido se queda con el valor process.env.NODE_ENV, sino asume que es 'development'
// estos se definen en los archivos de la carpeta config
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.APP_ENV = process.env.APP_ENV || 'development';

// env files
import dotenv = require('dotenv');

dotenv.config({
    path: `${__dirname}/../config/.env.${process.env.APP_ENV}`
});

console.log(process.env.APP_FOO);


import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

const app: express.Application = express();

// JSON Support para los Request
app.use(express.json());

// Container
loadContainer(app);

// Controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app };