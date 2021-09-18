import { ICreateAnnouncementsDTO } from '@modules/announcements/dtos/ICreateAnnouncementsDTO';
import { IAnnouncementsRepository } from '@modules/announcements/repositories/IAnnouncementsRepository';
import { IAnnouncement } from '@modules/announcements/schemas/IAnnouncement';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Announcements } from '../schemas/Announcement';

class AnnouncementsRepository implements IAnnouncementsRepository {
  private announcementsRepository: MongoRepository<Announcements>;

  constructor() {
    this.announcementsRepository = getMongoRepository<Announcements>(
      Announcements,
      'default',
    );
  }

  public async create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement> {
    const announcement = this.announcementsRepository.create(datas);
    await this.announcementsRepository.save(announcement);

    return announcement;
  }
}

export { AnnouncementsRepository };
