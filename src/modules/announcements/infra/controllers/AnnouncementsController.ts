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

    await createAnnouncementsService.execute(file);
    return response.json({ teste: 'ok' });
  }
}

export { AnnouncementsController };
