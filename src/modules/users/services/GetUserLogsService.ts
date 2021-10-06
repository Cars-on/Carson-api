import { inject, injectable } from 'tsyringe';

import { IUsersLogRepository } from '@modules/users/repositories';

@injectable()
class GetUserLogsService {
  constructor(
    @inject('UsersLogRepository')
    private usersLogRepository: IUsersLogRepository,
  ) {}

  public async execute(lot: string): Promise<any> {
    const logs = await this.usersLogRepository.findByLot(lot);

    return logs;
  }
}

export { GetUserLogsService };
