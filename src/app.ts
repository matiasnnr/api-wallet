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

console.log(process.env.APP_ENV);


import express = require('express');
import { loadControllers } from 'awilix-express';
import loadContainer from './container';
import jwt from 'express-jwt';
import cors from 'cors';

const app: express.Application = express();

// JSON Support para los Request
app.use(express.json());

// CORS Support
app.use(cors());

// Container
loadContainer(app);

// Jwt
if (process.env.jwt_secret_key) {
    app.use(jwt({
        secret: process.env.jwt_secret_key,
        algorithms: ['HS256']
    }).unless({ path: ['/', '/check']}));
}

// Controllers
app.use(loadControllers(
    'controllers/*.ts',
    { cwd: __dirname }
));

export { app };