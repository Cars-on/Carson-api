import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUsersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { IUser } from '@modules/users/schemas/IUser';
import { ObjectID } from 'mongodb';
import { getMongoRepository, MongoRepository } from 'typeorm';
import { User } from '../schemas/User';

class UsersRepository implements IUsersRepository {
  private usersRepository: MongoRepository<User>;

  constructor() {
    this.usersRepository = getMongoRepository<User>(User, 'default');
  }

  public async findAll(): Promise<IUser[] | undefined> {
    return await this.usersRepository.find();
  }

  public async create(datas: ICreateUsersDTO): Promise<User> {
    const newUsers = this.usersRepository.create(datas);

    await this.usersRepository.save(newUsers);

    return newUsers;
  }

  public async findByDocument(document: string): Promise<User | undefined> {
    if (document.length > 11) {
      return await this.usersRepository.findOne({ where: { cnpj: document } });
    }

    return await this.usersRepository.findOne({ where: { cpf: document } });
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  public async findById(userId: string): Promise<IUser | undefined> {
    return await this.usersRepository.findOne({
      where: { _id: new ObjectID(userId) },
    });
  }

  public async save(user: IUser): Promise<IUser | undefined> {
    await this.usersRepository.updateOne(
      {
        _id: new ObjectID(user.id),
      },
      {
        $set: { ...user },
      },
    );

    const updatedUser = await this.usersRepository.findOne({
      where: { _id: user.id },
    });

    return updatedUser;
  }
}

export { UsersRepository };
