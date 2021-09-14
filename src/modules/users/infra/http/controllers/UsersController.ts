import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';

class UsersController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    if (!file) {
      return response.status(401).json({
        message: 'É necessário um arquivo CSV para criação de usuários',
      });
    }

    const createUserService = container.resolve(CreateUserService);
    const lot = await createUserService.execute(file);

    return response.json({
      message: 'CSV com usuários inserido com sucesso',
      lot,
    });
  }
}

export { UsersController };
