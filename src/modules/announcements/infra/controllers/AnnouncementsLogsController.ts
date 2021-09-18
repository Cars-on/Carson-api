import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserLogsService } from '@modules/announcements/services/GetAnnouncementsLogsService';

class AnnouncementsLogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { lot } = request.params;

    const announcementsLogsService = container.resolve(GetUserLogsService);
    const announcementsLogs = await announcementsLogsService.execute(lot);

    return response.json(announcementsLogs);
  }
}

export { AnnouncementsLogsController };
