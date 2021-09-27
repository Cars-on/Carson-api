import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/users.routes';
import { usersLogsRoutes } from '@modules/users/infra/http/routes/users.logs.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes';
import { announcementRoutes } from '@modules/announcements/infra/http/routes/announcements.routes';
import { AnnouncementsLogsRoutes } from '@modules/announcements/infra/http/routes/announcements.logs.routes';
import { usersAnnouncementRoutes } from '@modules/announcements/infra/http/routes/announcements.users.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/users-logs', usersLogsRoutes);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/announcements', announcementRoutes);
routes.use('/announcements-logs', AnnouncementsLogsRoutes);
routes.use('/announcements-users', usersAnnouncementRoutes);

export { routes };
