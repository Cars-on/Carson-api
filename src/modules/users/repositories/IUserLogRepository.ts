import { ICreateUserLogDTO } from '@modules/users/dtos';
import { IUserLogs } from '../schemas';

interface IUsersLogRepository {
  create(datas: ICreateUserLogDTO): Promise<IUserLogs | undefined>;
  findByLot(lot: string): Promise<IUserLogs[] | undefined>;
}

export { IUsersLogRepository };
