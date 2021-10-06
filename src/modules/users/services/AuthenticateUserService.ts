import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';

import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '../repositories';

import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

import { IUser } from '../schemas';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: IUser;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    console.log(email, password);
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Senha ou email inválidos.', 401);
    }

    if (user.first_access) {
      throw new AppError('Necessário alterar a senha no primeiro acesso');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Senha ou email inválidos.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
