import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUsersDTO';
import { IUser } from '../schema/IUser';

interface IUsersRepository {
  create(datas: ICreateUsersDTO): Promise<IUser>;
  findByDocument(document: string): Promise<IUser | undefined>;
  findAll(): Promise<IUser[]>;
}

export { IUsersRepository };
