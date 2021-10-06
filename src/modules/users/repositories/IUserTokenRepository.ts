import { IUserToken } from '../schemas';

interface IUserTokenRepository {
  create(userId: string): Promise<IUserToken>;
  findByToken(token: string): Promise<IUserToken | undefined>;
}

export { IUserTokenRepository };
