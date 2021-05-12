import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';

import { Rental } from '../entities/Rental';

interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
  findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
}

export { IRentalsRepository };
