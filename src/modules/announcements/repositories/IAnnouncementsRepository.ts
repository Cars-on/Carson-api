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
  findAllByUserDocument(
    document: string,
    page: number,
    per_page: number,
  ): Promise<[IAnnouncement[], number]>;
  sevePhoto(id: string, photos: string[]): Promise<void>;
  filter(params: IQueryParamsDTO): Promise<[IAnnouncement[], number]>;
}

export { IAnnouncementsRepository };
