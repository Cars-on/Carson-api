import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  CreateAnnouncementsService,
  GetAnnouncementsService,
  GetAnnouncementByIdService,
  UploadPhotosService,
} from '@modules/announcements/services';

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

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAnnouncementByIdService = container.resolve(
      GetAnnouncementByIdService,
    );

    const announcement = await getAnnouncementByIdService.execute(id);

    return response.json(announcement);
  }

  public async upload(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const photos = request.files;

    const uploadPhotosService = container.resolve(UploadPhotosService);

    const announcement = await uploadPhotosService.execute(
      id,
      <Express.Multer.File[]>photos,
    );

    return response.json(announcement);
  }
}

export { AnnouncementsController };
