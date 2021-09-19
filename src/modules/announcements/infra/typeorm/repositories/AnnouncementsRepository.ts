import { ICreateAnnouncementsDTO } from '@modules/announcements/dtos/ICreateAnnouncementsDTO';
import { IQueryParamsDTO } from '@modules/announcements/dtos/IQueryParamsDTO';
import { IAnnouncementsRepository } from '@modules/announcements/repositories/IAnnouncementsRepository';
import { IAnnouncement } from '@modules/announcements/schemas/IAnnouncement';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { Announcement } from '../schemas/Announcement';

class AnnouncementsRepository implements IAnnouncementsRepository {
  private announcementsRepository: MongoRepository<Announcement>;

  constructor() {
    this.announcementsRepository = getMongoRepository<Announcement>(
      Announcement,
      'default',
    );
  }

  public async create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement> {
    const announcement = this.announcementsRepository.create(datas);
    await this.announcementsRepository.save(announcement);

    return announcement;
  }

  public async findAll({
    page,
    per_page,
  }: IQueryParamsDTO): Promise<[IAnnouncement[], number]> {
    const announcements = await this.announcementsRepository.findAndCount({
      skip: (page - 1) * per_page,
      take: per_page,
    });
    // const announcements = await this.announcementsRepository
    //   .createCursor(
    //     this.announcementsRepository.findAndCount({
    //       skip: (page - 1) * per_page,
    //       take: per_page,
    //     }),
    //   )
    //   .toArray();

    return announcements;
  }
}

export { AnnouncementsRepository };
