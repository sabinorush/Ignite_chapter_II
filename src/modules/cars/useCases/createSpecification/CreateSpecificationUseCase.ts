import { inject, injectable } from "tsyringe";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({ name, description }: IRequest): Promise<void> {

    const spcificationAlreadyExists = await this.specificationsRepository.findByName(name);
    if (spcificationAlreadyExists) {
      throw new Error("Specifications already exists!");
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }
}

export { CreateSpecificationUseCase }