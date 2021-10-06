import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import { IAnnouncementsRepository } from '../repositories';

@injectable()
class UploadPhotosService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(
    id: string,
    photos: Express.Multer.File[],
  ): Promise<void> {
    const announcement = await this.announcementsRepository.findById(id);

    if (!announcement) {
      throw new AppError('Anúncio não encontrado', 404);
    }
    const announcementPhoto: any = [];

    photos.map(async photo => {
      announcementPhoto.push(photo.path);
    });

    await this.announcementsRepository.sevePhoto(id, announcementPhoto);
  }
}

export { UploadPhotosService };
