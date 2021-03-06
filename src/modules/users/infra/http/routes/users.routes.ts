import { Router } from 'express';
import multer from 'multer';

import { UsersController } from '@modules/users/infra/http/controllers';

const userRoutes = Router();

const usersController = new UsersController();

const upload = multer({
  dest: './tmp',
});

userRoutes.post('/import', <any>upload.single('file'), usersController.upload);

userRoutes.delete('/:id', usersController.delete);

userRoutes.get('/', usersController.index);

export { userRoutes };
