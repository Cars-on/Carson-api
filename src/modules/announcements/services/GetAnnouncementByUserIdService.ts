import { inject, injectable } from 'tsyringe';

import { IAnnouncementsRepository } from '../repositories';
import { IAnnouncement } from '../schemas';

@injectable()
class GetAnnouncementByUserIdService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(id: string): Promise<IAnnouncement | undefined> {
    const announcement = await this.announcementsRepository.findByUserId(id);

    return announcement;
  }
}

export { GetAnnouncementByUserIdService };
