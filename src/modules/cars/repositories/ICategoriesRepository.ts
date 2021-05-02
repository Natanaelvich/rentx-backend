import { Category } from '../entities/Categorie';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}
interface ICategoriesRepository {
  findByName(name: string): Promise<Category | undefined>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
export { ICategoriesRepository, ICreateCategoryDTO };
