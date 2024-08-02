/* eslint-disable import/no-extraneous-dependencies */
import express, { Express } from 'express';
// eslint-disable-next-line
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import passport from 'passport';
import { config } from './config';
import { router } from './routes';

import swaggerOutput from './swagger.json';
import { loggerMiddleware } from './utils';
import { passportStrategy } from './config/passport';

const app: Express = express();
const { port } = config;
app.use(helmet());
app.use(cors());
passportStrategy(passport);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
app.use(router);
app.use(loggerMiddleware);

export { app, port };
