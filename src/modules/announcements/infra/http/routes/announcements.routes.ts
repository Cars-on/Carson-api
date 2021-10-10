import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { AnnouncementsController } from '@modules/announcements/infra/http/controllers';

const announcementRoutes = Router();

const announcementsController = new AnnouncementsController();

const upload = multer({
  dest: './tmp',
});

const uploadImage = multer(uploadConfig);

announcementRoutes.post(
  '/import',
  <any>upload.single('file'),
  announcementsController.create,
);

announcementRoutes.patch(
  '/:id',
  <any>uploadImage.array('photos'),
  announcementsController.upload,
);

announcementRoutes.get('/', announcementsController.index);
announcementRoutes.get('/:id', announcementsController.show);

export { announcementRoutes };
