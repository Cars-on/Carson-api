import { Router } from 'express';

import { AnnouncementsLogsController } from '@modules/announcements/infra/controllers';

const AnnouncementsLogsRoutes = Router();

const announcementsLogsController = new AnnouncementsLogsController();

AnnouncementsLogsRoutes.get('/:lot', announcementsLogsController.index);

export { AnnouncementsLogsRoutes };
