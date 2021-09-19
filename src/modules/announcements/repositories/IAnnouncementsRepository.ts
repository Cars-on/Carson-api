import { IQueryParamsDTO } from '@modules/announcements/dtos/IQueryParamsDTO';
import { ICreateAnnouncementsDTO } from '../dtos/ICreateAnnouncementsDTO';
import { IAnnouncement } from '../schemas/IAnnouncement';

interface IAnnouncementsRepository {
  create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement>;
  findAll(datas: IQueryParamsDTO): Promise<[IAnnouncement[], number]>;
  findById(id: string): Promise<IAnnouncement | undefined>;
}

export { IAnnouncementsRepository };
