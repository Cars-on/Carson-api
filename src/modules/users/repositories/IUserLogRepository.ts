import { ICreateUserLogDTO } from '@modules/users/dtos/ICreateUserLogDTO';
import { IUserLogs } from '../schema/IUserLogs';

interface IUsersLogRepository {
  create(datas: ICreateUserLogDTO): Promise<IUserLogs | undefined>;
  findByLot(lot: string): Promise<IUserLogs[] | undefined>;
}

export { IUsersLogRepository };
