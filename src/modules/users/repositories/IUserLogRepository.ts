import { ICreateUserLogDTO } from '@modules/users/dtos/ICreateUserLogDTO';
import { IUserLog } from '../schema/IUserLogs';

interface IUsersLogRepository {
  create(datas: ICreateUserLogDTO): Promise<IUserLog>;
}

export { IUsersLogRepository };
