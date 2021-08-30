import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ projeto: 'Carson' });
});

export default routes;
