import { Router } from 'express';

import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ensureAuthenticated } from '@shared/infra/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/middlewares/ensureAdmin';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  listAvailableCarsController.handle,
);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

export { carsRoutes };
