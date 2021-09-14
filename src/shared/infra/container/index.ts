import 'reflect-metadata';
import { container } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUsersLogRepository } from '@modules/users/repositories/IUserLogRepository';
import { UsersLogRepository } from '@modules/users/infra/typeorm/repositories/UsersLogRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersLogRepository>(
  'UsersLogRepository',
  UsersLogRepository,
);
