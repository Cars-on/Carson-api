import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { AppError } from '@shared/errors/AppError';
import { IAnnouncementsRepository } from '../repositories';

interface IRequest {
  user_id: string;
  announcement_id: string;
}

@injectable()
class DeleteUserAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, announcement_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    await this.announcementsRepository.delete(announcement_id);
  }
}

export { DeleteUserAnnouncementsService };
