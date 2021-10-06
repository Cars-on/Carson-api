import { ICreateAnnouncementsDTO } from '../dtos';
import { IAnnouncementLogs } from '../schemas';

interface IAnnouncementsLogsRepository {
  create(
    datas: ICreateAnnouncementsDTO,
  ): Promise<IAnnouncementLogs | undefined>;
  findByLot(lot: string): Promise<IAnnouncementLogs[] | undefined>;
}

export { IAnnouncementsLogsRepository };
