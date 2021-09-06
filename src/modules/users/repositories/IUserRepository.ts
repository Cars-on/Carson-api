import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { IUser } from '../schema/IUser';

interface IUsersRepository {
  create(datas: ICreateUserDTO): Promise<IUser>;
  findByDocument(document: string): Promise<IUser | undefined>;
}

export { IUsersRepository };
