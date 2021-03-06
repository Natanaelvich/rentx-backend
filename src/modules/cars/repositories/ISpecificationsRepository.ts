import { Specification } from '../entities/Specifications';

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository, ICreateSpecificationDTO };
