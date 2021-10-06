import {
  ICreateAnnouncementsDTO,
  IQueryParamsDTO,
} from '@modules/announcements/dtos';
import { IAnnouncementsRepository } from '@modules/announcements/repositories';
import { IAnnouncement } from '@modules/announcements/schemas';
import { ObjectID } from 'mongodb';
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
    return await this.announcementsRepository.save(announcement);
  }

  public async findAll({
    page,
    per_page,
  }: IQueryParamsDTO): Promise<[IAnnouncement[], number]> {
    return await this.announcementsRepository.findAndCount({
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  public async findById(id: string): Promise<IAnnouncement | undefined> {
    return await this.announcementsRepository.findOne({
      where: { _id: new ObjectID(id) },
    });
  }

  public async findByUserId(id: string): Promise<IAnnouncement | undefined> {
    return await this.announcementsRepository.findOne({
      where: { user_id: new ObjectID(id) },
    });
  }

  public async sevePhoto(id: string, photos: string[]): Promise<void> {
    await this.announcementsRepository.updateOne(
      {
        _id: new ObjectID(id),
      },
      {
        $set: { photos },
      },
    );
  }
}

export { AnnouncementsRepository };
