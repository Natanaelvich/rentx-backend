import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../entities/Car';

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
}

export { ICarsRepository };
