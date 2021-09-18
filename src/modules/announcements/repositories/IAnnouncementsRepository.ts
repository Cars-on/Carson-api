import { ICreateAnnouncementsDTO } from '../dtos/ICreateAnnouncementsDTO';
import { IAnnouncement } from '../schemas/IAnnouncement';

interface IAnnouncementsRepository {
  create(datas: ICreateAnnouncementsDTO): Promise<IAnnouncement>;
  findAll(): Promise<IAnnouncement[] | undefined>;
}

export { IAnnouncementsRepository };
