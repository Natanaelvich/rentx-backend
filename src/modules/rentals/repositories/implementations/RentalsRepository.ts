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
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
      id,
      end_date,
      total,
    });
    await this.repository.save(rental);
    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental | undefined> {
    const openedRentalWithCar = await this.repository.findOne({ car_id });
    return openedRentalWithCar;
  }

  async findOpenRentalByUser(car_id: string): Promise<Rental | undefined> {
    const openedRentalWithUser = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return openedRentalWithUser;
  }

  async findById(user_id: string): Promise<Rental | undefined> {
    return this.repository.findOne({ where: { user_id, end_date: null } });
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    return this.repository.find({ user_id });
  }
}

export { RentalsRepository };
