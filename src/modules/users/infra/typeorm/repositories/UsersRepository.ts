import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { getConnection } from 'typeorm';
import { User } from '../schemas/User';

class UsersRepository implements IUsersRepository {
  public async create(datas: ICreateUserDTO): Promise<User> {
    const usersRepo = getConnection().getMongoRepository(User);
    const newUser = usersRepo.create(datas);

    await usersRepo.save(newUser);

    return newUser;
  }
}

export { UsersRepository };
