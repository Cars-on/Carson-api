import { IAnnouncementsRepository } from '@modules/announcements/repositories';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../repositories';

@injectable()
class DeleteUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.usersRepository.delete(id);

    const announcements = await this.announcementsRepository.findAllByUserId(
      id,
    );

    if (announcements) {
      for (const announcement of announcements) {
        await this.announcementsRepository.delete(
          announcement.id.toHexString(),
        );
      }
    }
  }
}

export { DeleteUsersService };
