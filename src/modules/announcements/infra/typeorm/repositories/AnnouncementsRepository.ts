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
    page = 1,
    per_page = 12,
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

  public async filter({
    page = 1,
    per_page = 12,
    city,
    lowest_price,
    biggest_price,
    model,
    lowest_year,
    biggest_year,
    brand,
    manufacturer,
  }: IQueryParamsDTO): Promise<[IAnnouncement[], number]> {
    const query = {};
    if (manufacturer) {
      Object.assign(query, { manufacturer });
    }
    if (brand) {
      Object.assign(query, { brand });
    }
    if (city) {
      Object.assign(query, { city });
    }
    if (lowest_price) {
      Object.assign(query, { price: { $gte: lowest_price } });
    }
    if (biggest_price) {
      Object.assign(query, { price: { $lte: biggest_price } });
    }
    if (lowest_price && biggest_price) {
      Object.assign(query, {
        price: { $gte: lowest_price, $lte: biggest_price },
      });
    }
    if (model) {
      Object.assign(query, { model });
    }
    if (lowest_year) {
      Object.assign(query, { brand_year: { $gte: lowest_year } });
    }
    if (biggest_year) {
      Object.assign(query, { brand_year: { $lte: biggest_year } });
    }
    if (lowest_year && biggest_year) {
      Object.assign(query, {
        brand_year: { $gte: lowest_year, $lte: biggest_year },
      });
    }

    const announcements = await this.announcementsRepository.findAndCount({
      where: query,
      skip: (page - 1) * per_page,
      take: per_page,
    });

    return announcements;
  }

  public async findAllByUserDocument(
    document: string,
    page = 1,
    per_page = 12,
  ): Promise<[IAnnouncement[], number]> {
    if (document.length > 11) {
      return await this.announcementsRepository.findAndCount({
        where: { cnpj: document },
        skip: (page - 1) * per_page,
        take: per_page,
      });
    }

    return await this.announcementsRepository.findAndCount({
      where: { cpf: document },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }
}

export { AnnouncementsRepository };
