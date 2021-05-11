import { getRepository, Repository } from 'typeorm';

import { Specification } from '../../entities/Specifications';
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findByIds(ids);
    return specifications;
  }

  async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.repository.findOne({
      name,
    });

    return specification;
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }
}

export { SpecificationsRepository };
