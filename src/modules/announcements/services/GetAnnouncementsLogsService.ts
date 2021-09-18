import { inject, injectable } from 'tsyringe';

import { IAnnouncementsLogsRepository } from '@modules/announcements/repositories/IAnnouncementsLogsRepository';

@injectable()
class GetAnnouncementsLogsService {
  constructor(
    @inject('AnnouncementsLogsRepository')
    private announcementsLogsRepository: IAnnouncementsLogsRepository,
  ) {}

  public async execute(lot: string): Promise<any> {
    const logs = await this.announcementsLogsRepository.findByLot(lot);

    return logs;
  }
}

export { GetAnnouncementsLogsService };
