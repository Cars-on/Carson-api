import { IUserTokenRepository } from '@modules/users/repositories/IUserTokenRepository';
import { IUserToken } from '@modules/users/schemas/IUserToken';
import { getMongoRepository, MongoRepository } from 'typeorm';
// import { User } from '../schemas/User';
import { UserToken } from '../schemas/UserToeken';

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
