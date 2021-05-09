import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ensureAuthenticated } from '@shared/infra/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/middlewares/ensureAdmin';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

export { carsRoutes };
