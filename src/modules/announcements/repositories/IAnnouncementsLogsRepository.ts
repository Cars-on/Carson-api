import { ICreateAnnouncementsDTO } from '../dtos/ICreateAnnouncementsDTO';
import { IAnnouncementLogs } from '../schemas/IAnnouncementLogs';

interface IAnnouncementsLogsRepository {
  create(
    datas: ICreateAnnouncementsDTO,
  ): Promise<IAnnouncementLogs | undefined>;
  findByLot(lot: string): Promise<IAnnouncementLogs[] | undefined>;
}

export { IAnnouncementsLogsRepository };
