import { IUserToken } from '../schemas/IUserToken';

interface IUserTokenRepository {
  create(userId: string): Promise<IUserToken>;
}

export { IUserTokenRepository };
