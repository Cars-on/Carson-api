import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', (req, res) => {
  return res.json({ projeto: 'Carson' });
});

export { userRoutes };
