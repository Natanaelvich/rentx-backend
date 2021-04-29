// import appointmentsRouter from '@modules/Appointmensts/infra/http/routes/appointments.routes';

import { Router } from 'express';
import { categoriesRoutes } from './categories.routes';

const routes = Router();

routes.use('/categories', categoriesRoutes);

export default routes;
