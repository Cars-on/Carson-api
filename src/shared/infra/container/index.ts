import 'reflect-metadata';
import { container } from 'tsyringe';

import './providers';

import {
  IUsersRepository,
  IUsersLogRepository,
  IUserTokenRepository,
} from '@modules/users/repositories';
import {
  UsersRepository,
  UsersLogRepository,
  UserTokensRepository,
} from '@modules/users/infra/typeorm/repositories';

import {
  AnnouncementsRepository,
  AnnouncementsLogsRepository,
} from '@modules/announcements/infra/typeorm/repositories';
import {
  IAnnouncementsRepository,
  IAnnouncementsLogsRepository,
} from '@modules/announcements/repositories';

import { IHashProvider } from '@modules/users/providers/HashProvider/models/IHashProvider';
import { BCryptHashProvider } from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUsersLogRepository>(
  'UsersLogRepository',
  UsersLogRepository,
);

container.registerSingleton<IAnnouncementsRepository>(
  'AnnouncementsRepository',
  AnnouncementsRepository,
);

container.registerSingleton<IAnnouncementsLogsRepository>(
  'AnnouncementsLogsRepository',
  AnnouncementsLogsRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'TokenRepository',
  UserTokensRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
