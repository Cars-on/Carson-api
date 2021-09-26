import 'reflect-metadata';
import { container } from 'tsyringe';

import './providers';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';

import { IUsersLogRepository } from '@modules/users/repositories/IUserLogRepository';
import { UsersLogRepository } from '@modules/users/infra/typeorm/repositories/UsersLogRepository';

import { AnnouncementsRepository } from '@modules/announcements/infra/typeorm/repositories/AnnouncementsRepository';
import { IAnnouncementsRepository } from '@modules/announcements/repositories/IAnnouncementsRepository';

import { AnnouncementsLogsRepository } from '@modules/announcements/infra/typeorm/repositories/AnnouncementsLogsRepository';
import { IAnnouncementsLogsRepository } from '@modules/announcements/repositories/IAnnouncementsLogsRepository';

import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import { UserTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

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
