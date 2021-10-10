import { Router } from 'express';

import { AnnouncementsFilterController } from '@modules/announcements/infra/http/controllers';
import { announcementsQueryFilter } from '../validations/announcementsValidate';

const announcementFilterRoutes = Router();

const announcementsFilterController = new AnnouncementsFilterController();

announcementFilterRoutes.get(
  '/',
  announcementsQueryFilter,
  announcementsFilterController.index,
);

export { announcementFilterRoutes };
