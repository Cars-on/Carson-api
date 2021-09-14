import { Router } from 'express';

import { UsersLogsController } from '@modules/users/infra/http/controllers/UsersLogsController';

const usersLogsRoutes = Router();

const usersLogsController = new UsersLogsController();

usersLogsRoutes.get('/:lot', usersLogsController.index);

usersLogsRoutes.get('/', (req, res) => {
  return res.json({ projeto: 'Carson' });
});

export { usersLogsRoutes };
