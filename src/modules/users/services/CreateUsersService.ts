import 'reflect-metadata';

import fs from 'fs';
import csvParse from 'csv-parse';
import { inject, injectable } from 'tsyringe';
import crypto from 'crypto';
import path from 'path';

import { VerifyParams } from '@modules/users/infra/validation/usersValidation';
import { deleteFile } from '@utils/deleteFile';

import { ICreateUsersDTO } from '@modules/users/dtos';
import {
  IUsersRepository,
  IUsersLogRepository,
  IUserTokenRepository,
} from '@modules/users/repositories';

import { IMailProvider } from '@shared/infra/container/providers/mailProvider/models/IMailProvider';

const verifyParams = new VerifyParams();

interface ICreateUserLot {
  item: ICreateUsersDTO;
  errors: string[];
  index: number;
  lot: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersLogRepository')
    private usersLogRepository: IUsersLogRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokenRepository')
    private tokenRepository: IUserTokenRepository,
  ) {}

  async createErrorLog({
    item,
    errors,
    index,
    lot,
  }: ICreateUserLot): Promise<void> {
    Object.assign(item, {
      error:
        item?.error && item?.error?.length
          ? [...item.error, ...errors]
          : errors,
      line: index + 1,
      lot,
    });

    await this.usersLogRepository.create(item);
  }

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
          await this.createErrorLog({ errors, lot, index, item });
          return;
        }

        const userFoundByEmail = await this.usersRepository.findByEmail(email);
        const userFoundByDocument = await this.usersRepository.findByDocument(
          cnpj || cpf,
        );

        if (userFoundByEmail) {
          const errors = ['email de usuário já cadastrado'];

          await this.createErrorLog({ errors, lot, index, item });
        }

        if (userFoundByDocument) {
          const errors = ['documento já cadastrado'];

          await this.createErrorLog({ errors, lot, index, item });
        }

        if (userFoundByEmail || userFoundByDocument) {
          return;
        }

        const user = await this.usersRepository.create({
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

        const userToken = await this.tokenRepository.create(user.id);

        const confirmUserTemplate = path.resolve(
          __dirname,
          '..',
          'views',
          'confirm_user.hbs',
        );

        await this.mailProvider.sendMail({
          to: {
            name: user.name,
            email: user.email,
          },
          subject: '[Carson] Confirmação de Cadastro',
          templateData: {
            file: confirmUserTemplate,
            variables: {
              name: user.name,
              link: `${process.env.APP_WEB_URL}/confirm-user?token=${userToken.token}`,
              companyName: 'CarsOn',
              password: user.password,
            },
          },
        });
      }
    });

    await deleteFile(file.path);

    return lot;
  }
}

export { CreateUsersService };
