import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetUserLogsService } from '@modules/users/services/GetUserLogsService';

class UsersLogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { lot } = request.params;

    const userLogsService = container.resolve(GetUserLogsService);
    const userLogs = await userLogsService.execute(lot);

    return response.json(userLogs);
  }
}

export { UsersLogsController };
