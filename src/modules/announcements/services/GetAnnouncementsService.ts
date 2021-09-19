import { inject, injectable } from 'tsyringe';

import { IQueryParamsDTO } from '@modules/announcements/dtos/IQueryParamsDTO';
import { IAnnouncementsRepository } from '../repositories/IAnnouncementsRepository';
import { IAnnouncement } from '../schemas/IAnnouncement';

interface IResponse {
  announcements: IAnnouncement[];
  page: number;
  total_pages: number;
  total_results: number;
}

@injectable()
class GetAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
  ) {}

  public async execute({
    page,
    per_page,
  }: IQueryParamsDTO): Promise<IResponse> {
    const [announcements, result] = await this.announcementsRepository.findAll({
      page,
      per_page,
    });

    return {
      announcements,
      page,
      total_pages: Math.ceil(result / per_page),
      total_results: result,
    };
  }
}

export { GetAnnouncementsService };
