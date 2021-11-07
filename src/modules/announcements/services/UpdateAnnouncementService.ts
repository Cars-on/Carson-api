import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateAnnouncementsDTO } from '../dtos/IUpdateAnnouncementsDTO';

import { IAnnouncementsRepository } from '../repositories';
import { IAnnouncement } from '../schemas';

@injectable()
class UpdateAnnouncementService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(
    params: IUpdateAnnouncementsDTO,
  ): Promise<IAnnouncement> {
    const announcement = await this.announcementsRepository.findById(params.id);

    if (!announcement) {
      throw new AppError('Anúncio não encontrado', 404);
    }

    if (announcement.user_id.toString() !== params.user_id) {
      throw new AppError(
        'Você não tem permissão para atualizar esse anúncio',
        401,
      );
    }

    const updatedAnnouncement = await this.announcementsRepository.update(
      params,
    );

    return updatedAnnouncement;
  }
}

export { UpdateAnnouncementService };
