import { ICreateUsersDTO } from '@modules/users/dtos';
import { IUser } from '../schemas';

interface IUsersRepository {
  create(datas: ICreateUsersDTO): Promise<IUser>;
  findByDocument(document: string): Promise<IUser | undefined>;
  findAll(): Promise<IUser[] | undefined>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(userId: string): Promise<IUser | undefined>;
  save(user: Omit<IUser, 'id'>): Promise<IUser | undefined>;
}

export { IUsersRepository };
