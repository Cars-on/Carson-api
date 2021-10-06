import { ICreateAnnouncementsDTO } from '@modules/announcements/dtos';
import { IAnnouncementsLogsRepository } from '@modules/announcements/repositories';
import { IAnnouncementLogs } from '@modules/announcements/schemas';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { AnnouncementLogs } from '../schemas';

class AnnouncementsLogsRepository implements IAnnouncementsLogsRepository {
  private announcementsLogsRepository: MongoRepository<AnnouncementLogs>;

  constructor() {
    this.announcementsLogsRepository = getMongoRepository<AnnouncementLogs>(
      AnnouncementLogs,
      'default',
    );
  }

  public async create(
    datas: ICreateAnnouncementsDTO,
  ): Promise<IAnnouncementLogs | undefined> {
    const createLog = this.announcementsLogsRepository.create(datas);
    await this.announcementsLogsRepository.save(createLog);

    return createLog;
  }

  public async findByLot(
    lot: string,
  ): Promise<IAnnouncementLogs[] | undefined> {
    const logs = await this.announcementsLogsRepository
      .createCursor(this.announcementsLogsRepository.find({ where: { lot } }))
      .toArray();

    return logs;
  }
}

export { AnnouncementsLogsRepository };
