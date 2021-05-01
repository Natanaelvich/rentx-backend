import { Request, Response } from 'express';
// import { container } from 'tsyringe';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

class CreateCategoryController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;
    // const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    this.createCategoryUseCase.execute({ name, description });

    return response.send();
  }
}

export { CreateCategoryController };
