import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { IUser } from '@modules/users/schema/IUser';
import { getConnection, getMongoRepository, MongoRepository } from 'typeorm';
import { User } from '../schemas/User';

class UsersRepository implements IUsersRepository {
  private logsRepository: MongoRepository<User>;

  constructor() {
    this.logsRepository = getMongoRepository<User>(User, 'default');
  }

  public async findAll(): Promise<IUser[]> {
    const users = await this.logsRepository
      .createCursor(this.logsRepository.find())
      .toArray();

    return users;
  }

  public async create(datas: ICreateUserDTO): Promise<User> {
    const newUsers = this.logsRepository.create(datas);

    await this.logsRepository.save(newUsers);

    return newUsers;
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    const usersRepo = getConnection().getMongoRepository(User);

    const findUser = usersRepo.findOne(document);

    return findUser;
  }
}

export { UsersRepository };
