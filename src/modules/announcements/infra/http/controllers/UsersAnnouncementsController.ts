import { Request, Response } from 'express';
import { container } from 'tsyringe';

import {
  GetAnnouncementByUserIdService,
  GetAllUserAnnouncementsService,
  DeleteUserAnnouncementsService,
  UpdateAnnouncementService,
} from '@modules/announcements/services';

class UsersAnnouncementsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { page, per_page } = request.query;

    const getUserAnnouncementsService = container.resolve(
      GetAllUserAnnouncementsService,
    );

    const announcements = await getUserAnnouncementsService.execute({
      user_id,
      page: Number(page) || 1,
      per_page: Number(per_page) || 12,
    });

    return response.send(announcements);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getAnnouncementByUserIdService = container.resolve(
      GetAnnouncementByUserIdService,
    );

    const announcement = await getAnnouncementByUserIdService.execute(id);

    return response.json(announcement);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { announcement_id } = request.params;

    const deleteUserAnnouncementsService = container.resolve(
      DeleteUserAnnouncementsService,
    );

    await deleteUserAnnouncementsService.execute({
      user_id,
      announcement_id,
    });

    return response.json({ message: 'Anúncio deletado' });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user_id = request.user.id;
    const params = request.body;

    Object.assign(params, { user_id, id });

    const updateAnnouncementService = container.resolve(
      UpdateAnnouncementService,
    );

    const announcement = await updateAnnouncementService.execute(params);

    return response.json(announcement);
  }
}

export { UsersAnnouncementsController };
