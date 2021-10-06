import { getMongoRepository, MongoRepository } from 'typeorm';

import { IUserTokenRepository } from '@modules/users/repositories';
import { IUserToken } from '@modules/users/schemas';
import { UserToken } from '../schemas';

class UserTokensRepository implements IUserTokenRepository {
  private usersTokenRepository: MongoRepository<UserToken>;

  constructor() {
    this.usersTokenRepository = getMongoRepository<UserToken>(
      UserToken,
      'default',
    );
  }

  public async create(userId: string): Promise<IUserToken> {
    const userToken = this.usersTokenRepository.create({ user_id: userId });

    await this.usersTokenRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    console.log(token);
    return await this.usersTokenRepository.findOne({ where: { token } });
  }
}

export { UserTokensRepository };
