import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import crypto from 'crypto';
import { inject, injectable } from 'tsyringe';

import { ICreateAnnouncementsDTO } from '@modules/announcements/dtos/ICreateAnnouncementsDTO';
import { IAnnouncementsRepository } from '../repositories/IAnnouncementsRepository';

// const verifyParams = new VerifyParams();
@injectable()
class CreateAnnouncementsService {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
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

  async execute(file: Express.Multer.File): Promise<void> {
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
        } = item;
        // const errors = await verifyParams.execute(item);
        // if (errors) {
        //   Object.assign(item, {
        //     error: errors,
        //     line: index + 1,
        // lot
        //   });
        //   await this.announcementsRepository.create(item);
        //   return;
        // }

        await this.announcementsRepository.create({
          manufacturer,
          brand,
          model,
          advertiser_code,
          manufacturer_year,
          brand_year,
          cpf,
          cnpj,
          price,
          lot,
        });
      }
    });

    return lot;
  }
}

export { CreateAnnouncementsService };
