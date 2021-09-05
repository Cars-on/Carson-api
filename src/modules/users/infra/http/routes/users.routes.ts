import { Router } from 'express';
import multer from 'multer';

import { UsersController } from '@modules/users/infra/http/controllers/UsersController';

const userRoutes = Router();

const usersController = new UsersController();

const upload = multer({
  dest: './tmp',
});

userRoutes.post('/import', <any>upload.single('file'), usersController.upload);

userRoutes.get('/', (req, res) => {
  return res.json({ projeto: 'Carson' });
});

export { userRoutes };
