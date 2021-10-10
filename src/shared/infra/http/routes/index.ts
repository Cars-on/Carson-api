import { Router } from 'express';
import {
  userRoutes,
  passwordRouter,
  sessionsRouter,
  usersLogsRoutes,
} from '@modules/users/infra/http/routes';

import {
  announcementRoutes,
  AnnouncementsLogsRoutes,
  usersAnnouncementRoutes,
  announcementFilterRoutes,
} from '@modules/announcements/infra/http/routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/users-logs', usersLogsRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/announcements', announcementRoutes);
routes.use('/announcements-logs', AnnouncementsLogsRoutes);
routes.use('/announcements-users', usersAnnouncementRoutes);
routes.use('/announcements-filter', announcementFilterRoutes);

export { routes };
