import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import { VerifyParams } from '@modules/announcements/infra/validation/announcementsValidation';

import { ICreateAnnouncementsDTO } from '@modules/announcements/dtos/ICreateAnnouncementsDTO';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { deleteFile } from '@utils/deleteFile';
import { IAnnouncementsRepository } from '../repositories/IAnnouncementsRepository';
import { IAnnouncementsLogsRepository } from '../repositories/IAnnouncementsLogsRepository';

const verifyParams = new VerifyParams();
@injectable()
class CreateAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,

    @inject('AnnouncementsLogsRepository')
    private announcementsLogsRepository: IAnnouncementsLogsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  saveAnnouncements(
    file: Express.Multer.File,
  ): Promise<ICreateAnnouncementsDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const announcements: ICreateAnnouncementsDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [
            manufacturer,
            brand,
            model,
            advertiser_code,
            manufacturer_year,
            brand_year,
            cpf,
            cnpj,
            price,
            description,
          ] = line;

          announcements.push({
            manufacturer,
            brand,
            model,
            advertiser_code,
            manufacturer_year,
            brand_year,
            cpf,
            cnpj,
            price,
            description,
          });
        })
        .on('end', () => {
          resolve(announcements);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<string> {
    const announcements = await this.saveAnnouncements(file);

    const lot = crypto.randomBytes(3).toString('hex');

    announcements.map(async (item, index) => {
      if (index !== 0) {
        const {
          manufacturer,
          brand,
          model,
          advertiser_code,
          manufacturer_year,
          brand_year,
          cpf,
          cnpj,
          price,
          description,
        } = item;

        const errors = await verifyParams.execute(item);

        if (errors) {
          Object.assign(item, {
            error: errors,
            line: index + 1,
            lot,
          });
          await this.announcementsLogsRepository.create(item);
          return;
        }

        const user = await this.usersRepository.findByDocument(cnpj || cpf);

        if (!user) {
          Object.assign(item, {
            error: 'Usuário não cadastrado, verificar cpf ou cnpj',
            line: index + 1,
            lot,
          });
          await this.announcementsLogsRepository.create(item);
          return;
        }

        await this.announcementsRepository.create({
          user_id: user.id,
          manufacturer,
          brand,
          model,
          advertiser_code,
          manufacturer_year,
          brand_year,
          cpf,
          cnpj,
          price,
          description,
          lot,
        });
      }
    });

    await deleteFile(file.path);

    return lot;
  }
}

export { CreateAnnouncementsService };
