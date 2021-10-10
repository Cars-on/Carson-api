import { injectable, inject } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { IUsersRepository, IUserTokenRepository } from '../repositories';

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TokenRepository')
    private tokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute(password: string, token: string): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('Token do usuário não entontrado', 404);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    user.first_access = false;
    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export { ResetPasswordService };
