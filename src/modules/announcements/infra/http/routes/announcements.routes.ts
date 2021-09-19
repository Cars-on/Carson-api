import { Router } from 'express';
import multer from 'multer';

import { AnnouncementsController } from '@modules/announcements/infra/controllers/AnnouncementsController';

const announcementRoutes = Router();

const announcementsController = new AnnouncementsController();

const upload = multer({
  dest: './tmp',
});

announcementRoutes.post(
  '/import',
  <any>upload.single('file'),
  announcementsController.create,
);

announcementRoutes.get('/', announcementsController.index);
announcementRoutes.get('/:id', announcementsController.show);

export { announcementRoutes };
