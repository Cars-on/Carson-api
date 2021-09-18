import { inject, injectable } from 'tsyringe';

import { IAnnouncementsRepository } from '../repositories/IAnnouncementsRepository';

@injectable()
class GetAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(): Promise<any> {
    const announcements = await this.announcementsRepository.findAll();

    return announcements;
  }
}

export { GetAnnouncementsService };
