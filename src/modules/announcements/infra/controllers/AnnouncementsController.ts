import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAnnouncementsService } from '@modules/announcements/services/CreateAnnouncementsService';
import { GetAnnouncementsService } from '@modules/announcements/services/GetAnnouncementsService';

class AnnouncementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      return response.status(401).json({
        message: 'É necessário um arquivo CSV para criação de usuários',
      });
    }

    const createAnnouncementsService = container.resolve(
      CreateAnnouncementsService,
    );

    const lot = await createAnnouncementsService.execute(file);
    return response.json({
      message: 'CSV com anúncios inserido com sucesso',
      lot,
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, per_page } = request.query;
    const getAnnouncementsService = container.resolve(GetAnnouncementsService);
    const announcements = await getAnnouncementsService.execute({
      page: Number(page) || 1,
      per_page: Number(per_page) || 12,
    });
    return response.json(announcements);
  }
}

export { AnnouncementsController };
