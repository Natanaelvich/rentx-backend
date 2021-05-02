import multer from 'multer';
import { Router } from 'express';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { importCategoryController } from '@modules/cars/useCases/importCategory';
import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
// import { createCategoryController } from '../modules/cars/useCases/createCategory';
// import { importCategoryController } from '../modules/cars/useCases/importCategory';

const categoriesRoutes = Router();
const upload = multer({
  dest: './tmp',
});

// categoriesRoutes.post('/', (request, response) => {
//   return createCategoryController.handle(request, response);
// });
const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
