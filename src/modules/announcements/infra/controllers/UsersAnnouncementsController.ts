import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetAnnouncementByUserIdService } from '@modules/announcements/services/GetAnnouncementByUserIdService';

class UsersAnnouncementsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAnnouncementByUserIdService = container.resolve(
      GetAnnouncementByUserIdService,
    );

    const announcement = await getAnnouncementByUserIdService.execute(id);

    return response.json(announcement);
  }
}

export { UsersAnnouncementsController };
