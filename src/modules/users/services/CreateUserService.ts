/* eslint-disable no-useless-constructor */
import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUserRepository';
// import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
// import { IUser } from '../schema/IUser';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(file: Express.Multer.File): Promise<void> {
    const stream = fs.createReadStream(file.path);

    const parseFile = csvParse();

    stream.pipe(parseFile);

    parseFile.on('data', async line => {
      console.log(line);
    });
  }
}

export { CreateUserService };
