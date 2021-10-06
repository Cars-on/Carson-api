import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUsersService, GetUsersService } from '@modules/users/services';

class UsersController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      return response.status(401).json({
        message: 'É necessário um arquivo CSV para criação de usuários',
      });
    }

    const createUsersService = container.resolve(CreateUsersService);
    const lot = await createUsersService.execute(file);

    return response.json({
      message: 'CSV com usuários inserido com sucesso',
      lot,
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const getUsersService = container.resolve(GetUsersService);
    const users = await getUsersService.execute();

    return response.json(users);
  }
}

export { UsersController };
