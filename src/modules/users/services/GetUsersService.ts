import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories/IUserRepository';

@injectable()
class GetUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<any> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export { GetUsersService };
