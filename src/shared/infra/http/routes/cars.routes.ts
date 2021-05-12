import { Router } from 'express';

import multer from 'multer';

import uploadConfig from '@config/upload';

import { CreateCarController } from '@modules/cars/useCases/createCar/createCarController';
import { ensureAuthenticated } from '@shared/infra/middlewares/ensureAuthenticated';
import { ensureAdmin } from '@shared/infra/middlewares/ensureAdmin';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImagesController = new UploadCarImagesController();

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

const uploadCarImages = multer(uploadConfig.multer);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImages.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
