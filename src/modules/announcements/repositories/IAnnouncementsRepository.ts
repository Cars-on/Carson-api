import { IQueryParamsDTO } from '@modules/announcements/dtos/IQueryParamsDTO';
import { ICreateAnnouncementsDTO } from '../dtos/ICreateAnnouncementsDTO';
import { IAnnouncement } from '../schemas/IAnnouncement';

interface IAnnouncementsRepository {
  create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement>;
  findAll(datas: IQueryParamsDTO): Promise<[IAnnouncement[], number]>;
  findById(id: string): Promise<IAnnouncement | undefined>;
  findByUserId(id: string): Promise<IAnnouncement | undefined>;
  sevePhoto(id: string, photos: string[]): Promise<void>;
}

export { IAnnouncementsRepository };
