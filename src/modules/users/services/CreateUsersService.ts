import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';

import { VerifyParams } from '@modules/users/infra/validation/usersValidation';
import { deleteFile } from '@utils/deleteFile';

import { ICreateUsersDTO } from '@modules/users/dtos/ICreateUsersDTO';
import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { IUsersLogRepository } from '@modules/users/repositories/IUserLogRepository';

const verifyParams = new VerifyParams();

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersLogRepository')
    private usersLogRepository: IUsersLogRepository,
  ) {}

  saveUsers(file: Express.Multer.File): Promise<ICreateUsersDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const users: ICreateUsersDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [
            cnpj,
            cpf,
            name,
            user_name,
            email,
            phone,
            address,
            state,
          ] = line;

          users.push({
            cnpj,
            cpf,
            name,
            user_name,
            email,
            phone,
            address,
            state,
          });
        })
        .on('end', () => {
          resolve(users);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<string> {
    const users = await this.saveUsers(file);

    const lot = crypto.randomBytes(3).toString('hex');

    users.map(async (item, index) => {
      if (index !== 0) {
        const {
          cnpj,
          cpf,
          name,
          user_name,
          email,
          phone,
          address,
          state,
        } = item;
        const errors = await verifyParams.execute(item);

        if (errors) {
          Object.assign(item, {
            error: errors,
            line: index + 1,
            lot,
          });
          await this.usersLogRepository.create(item);
          return;
        }

        await this.usersRepository.create({
          cnpj,
          cpf,
          name,
          user_name,
          email,
          phone,
          address,
          state,
          lot,
        });
      }
    });

    await deleteFile(file.path);

    return lot;
  }
}

export { CreateUsersService };
