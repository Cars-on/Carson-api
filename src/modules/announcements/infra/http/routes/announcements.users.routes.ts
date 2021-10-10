import { Router } from 'express';

import { UsersAnnouncementsController } from '@modules/announcements/infra/http/controllers';

const usersAnnouncementRoutes = Router();

const usersAnnouncementsController = new UsersAnnouncementsController();

usersAnnouncementRoutes.get('/:id', usersAnnouncementsController.show);

export { usersAnnouncementRoutes };
