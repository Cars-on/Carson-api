import {
  IQueryParamsDTO,
  ICreateAnnouncementsDTO,
} from '@modules/announcements/dtos';
import { IAnnouncement } from '../schemas';

interface IAnnouncementsRepository {
  create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement>;
  findAll(datas: IQueryParamsDTO): Promise<[IAnnouncement[], number]>;
  findById(id: string): Promise<IAnnouncement | undefined>;
  findByUserId(id: string): Promise<IAnnouncement | undefined>;
  sevePhoto(id: string, photos: string[]): Promise<void>;
}

export { IAnnouncementsRepository };
