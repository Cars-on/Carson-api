import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateAnnouncementsService } from '@modules/announcements/services/CreateAnnouncementsService';

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
}

export { AnnouncementsController };
