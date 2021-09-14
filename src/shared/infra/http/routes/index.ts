import { Router } from 'express';
import { userRoutes } from '@modules/users/infra/http/routes/users.routes';
import { usersLogsRoutes } from '@modules/users/infra/http/routes/users.logs.routes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/users-logs', usersLogsRoutes);

export { routes };
