import { Router } from 'express';

import { ensuredAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { UsersAnnouncementsController } from '@modules/announcements/infra/http/controllers';
import { announcementsUserValidate } from '../validations';

const usersAnnouncementRoutes = Router();

const usersAnnouncementsController = new UsersAnnouncementsController();

usersAnnouncementRoutes.use(ensuredAuthenticated);

usersAnnouncementRoutes.get(
  '/',
  announcementsUserValidate,
  usersAnnouncementsController.index,
);
usersAnnouncementRoutes.get('/:id', usersAnnouncementsController.show);

export { usersAnnouncementRoutes };
