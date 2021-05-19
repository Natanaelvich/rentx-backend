// import appointmentsRouter from '@modules/Appointmensts/infra/http/routes/appointments.routes';

import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { rentalRoutes } from './rentals.routes';
import { passwordRoutes } from './password.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', authenticateRoutes);
routes.use('/cars', carsRoutes);
routes.use('/rentals', rentalRoutes);
routes.use('/password', passwordRoutes);

export default routes;
