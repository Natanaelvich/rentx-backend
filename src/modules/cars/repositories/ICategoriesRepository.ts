import { Category } from '../entities/Categorie';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  findByName(name: string): Category | undefined;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
export { ICategoriesRepository, ICreateCategoryDTO };
