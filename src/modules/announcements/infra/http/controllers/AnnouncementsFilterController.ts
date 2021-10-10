import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FilternnouncementsService } from '@modules/announcements/services';

class AnnouncementsFilterController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { query } = request;

    const filteService = container.resolve(FilternnouncementsService);
    const announcementsFiltered = await filteService.execute(query);
    return response.json(announcementsFiltered);
    // const getAnnouncementsService = container.resolve(GetAnnouncementsService);
    // const announcements = await getAnnouncementsService.execute({
    //   page: Number(page) || 1,
    //   per_page: Number(per_page) || 12,
    // });
    // return response.json(announcements);
  }
}

export { AnnouncementsFilterController };
