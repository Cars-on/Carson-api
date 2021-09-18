import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/users.routes';
import { usersLogsRoutes } from '@modules/users/infra/http/routes/users.logs.routes';
import { announcementRoutes } from '@modules/announcements/infra/http/routes/announcements.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/users-logs', usersLogsRoutes);
routes.use('/announcements', announcementRoutes);

export { routes };
