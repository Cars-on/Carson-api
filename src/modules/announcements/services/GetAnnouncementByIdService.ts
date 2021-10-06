import { inject, injectable } from 'tsyringe';

import { IAnnouncementsRepository } from '../repositories';
import { IAnnouncement } from '../schemas';

@injectable()
class GetAnnouncementByIdService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(id: string): Promise<IAnnouncement | undefined> {
    const announcement = await this.announcementsRepository.findById(id);

    return announcement;
  }
}

export { GetAnnouncementByIdService };
