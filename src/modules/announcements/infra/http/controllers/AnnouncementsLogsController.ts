import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAnnouncementsLogsService } from '@modules/announcements/services';

class AnnouncementsLogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { lot } = request.params;

    const announcementsLogsService = container.resolve(
      GetAnnouncementsLogsService,
    );
    const announcementsLogs = await announcementsLogsService.execute(lot);

    return response.json(announcementsLogs);
  }
}

export { AnnouncementsLogsController };
