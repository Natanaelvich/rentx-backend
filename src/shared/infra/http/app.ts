import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import path from 'path';

import createConnection from '@shared/infra/typeorm';
import '@shared/container';

import upload from '@config/upload';
import { errors } from 'celebrate';
import swaggerFile from '../../swagger.json';
import routes from './routes';
import { handlingErrors } from '../middlewares/handlingErrors';

createConnection();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
  '/api-coverage',
  express.static(
    path.resolve(__dirname, '..', '..', '..', '..', 'coverage', 'lcov-report'),
  ),
);
app.get('/api-coverage', (request: Request, response: Response) => {
  return response.sendFile(
    path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'coverage',
      'lcov-report',
      'index.html',
    ),
  );
});

Sentry.init({
  dsn:
    'https://229a70a4905c4a8e882c267a2f0374a7@o351938.ingest.sentry.io/5459704',
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use('/files', express.static(upload.uploadsFolder));
app.use(routes);

app.use(Sentry.Handlers.errorHandler());
app.use(errors());

app.use(handlingErrors);

export { app };
