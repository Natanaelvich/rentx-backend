import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/entities/Rental';
import { getRepository, Repository } from 'typeorm';
import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const openedRentalWithCar = await this.repository.findOne({ car_id });
    return openedRentalWithCar;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental | undefined> {
    const openedRentalWithUser = await this.repository.findOne({ user_id });
    return openedRentalWithUser;
  }

  async findById(id: string): Promise<Rental | undefined> {
    return this.repository.findOne(id);
  }
}

export { RentalsRepository };
