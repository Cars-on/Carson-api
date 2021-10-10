import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilternnouncementsService } from '@modules/announcements/services';

class AnnouncementsFilterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;

    const filteService = container.resolve(FilternnouncementsService);
    const announcementsFiltered = await filteService.execute(query);
    return response.json(announcementsFiltered);
  }
}

export { AnnouncementsFilterController };
