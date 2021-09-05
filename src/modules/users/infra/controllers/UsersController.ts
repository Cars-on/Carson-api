import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserService } from '@modules/users/services/CreateUserService';

class UsersController {
  public async upload(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const createUserService = container.resolve(CreateUserService);
    await createUserService.execute(file);
    return response.send('ok');
  }
}

export { UsersController };
