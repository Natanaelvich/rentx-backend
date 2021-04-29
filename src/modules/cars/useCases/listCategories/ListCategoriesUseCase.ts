import { Category } from '@modules/cars/entities/Categorie';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoriesUseCase };
