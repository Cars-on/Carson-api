import { ICreateUserLogDTO } from '@modules/users/dtos/ICreateUserLogDTO';
import { IUsersLogRepository } from '@modules/users/repositories/IUserLogRepository';
import { getConnection } from 'typeorm';
import { UserLog } from '../schemas/UserLog';

class UsersLogRepository implements IUsersLogRepository {
  public async create(datas: ICreateUserLogDTO): Promise<UserLog> {
    const usersRepo = getConnection().getMongoRepository(UserLog);
    const newUser = usersRepo.create(datas);

    await usersRepo.save(newUser);

    return newUser;
  }
}

export { UsersLogRepository };
