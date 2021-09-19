import { ICreateUserLogDTO } from '@modules/users/dtos/ICreateUserLogDTO';
import { IUsersLogRepository } from '@modules/users/repositories/IUserLogRepository';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { UserLog } from '../schemas/UserLogs';

class UsersLogRepository implements IUsersLogRepository {
  private logsRepository: MongoRepository<UserLog>;

  constructor() {
    this.logsRepository = getMongoRepository<UserLog>(UserLog, 'default');
  }

  public async create(datas: ICreateUserLogDTO): Promise<UserLog | undefined> {
    const createLog = this.logsRepository.create(datas);
    await this.logsRepository.save(createLog);

    return createLog;
  }

  public async findByLot(lot: string): Promise<UserLog[] | undefined> {
    return await this.logsRepository.find({ where: { lot } });
  }
}

export { UsersLogRepository };
