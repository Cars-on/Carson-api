/* eslint-disable no-useless-constructor */
import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  saveUsers(file: Express.Multer.File): Promise<ICreateUserDTO[]> {
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const users: ICreateUserDTO[] = [];

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [cnpj, cpf, name, user_name, email, phone, address] = line;

          users.push({
            cnpj,
            cpf,
            name,
            user_name,
            email,
            phone,
            address,
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

  async execute(file: Express.Multer.File): Promise<void> {
    const users = await this.saveUsers(file);

    users.map(async (item, index) => {
      if (index !== 0) {
        const { cnpj, cpf, name, user_name, email, phone, address } = item;

        await this.usersRepository.create({
          cnpj,
          cpf,
          name,
          user_name,
          email,
          phone,
          address,
        });
      }
    });
  }
}

export { CreateUserService };
