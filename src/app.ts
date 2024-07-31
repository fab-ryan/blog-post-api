import express, { Express } from 'express';
// import passport from 'passport';
import { config } from './config';

const app: Express = express();
const { port } = config;

app.use(express.json());

export { app, port };
