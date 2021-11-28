import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories';
import { AppError } from '@shared/errors/AppError';
import { IAnnouncementsRepository } from '../repositories';
import { IAnnouncement } from '../schemas';

interface IRequest {
  user_id: string;
  page: number;
  per_page: number;
}

interface IResponse {
  announcements: IAnnouncement[];
  page: number;
  total_pages: number;
  total_results: number;
}

@injectable()
class GetAllUserAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    page,
    per_page,
  }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    const document = user.cnpj ? user.cnpj : user.cpf;

    const [
      announcements,
      result,
    ] = await this.announcementsRepository.findAllByUserDocument(
      document,
      page,
      per_page,
    );

    return {
      announcements,
      page,
      total_pages: Math.ceil(result / per_page),
      total_results: result,
    };
  }
}

export { GetAllUserAnnouncementsService };
