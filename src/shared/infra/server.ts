import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';

import './typeorm';
import './container';

import { AppError } from '@shared/errors/AppError';
import { routes } from './http/routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: AppError, _request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    console.log(err);

    return response.status(500).json({
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('Server running ✨✨✨✨✨');
});
