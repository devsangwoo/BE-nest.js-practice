import { Types } from 'mongoose';
import { FilterInput } from '../graphql/inputs/graphql-filter.input';

export class CommonServiceTests {
  public readonly entityService;
  public readonly entityRepository;

  constructor(_entityService, _entityRepository) {
    this.entityService = _entityService;
    this.entityRepository = _entityRepository;
  }

  public async getEntityById() {
    const id = Types.ObjectId().toHexString();

    await this.entityService.getEntityById({ id });

    expect(this.entityRepository.getEntityById).toHaveBeenCalled();
    expect(this.entityRepository.getEntityById).toHaveBeenCalledWith({
      id,
    });
  }

  public async getAllEntities(filterInput: FilterInput = {}) {
    await this.entityRepository.getAllEntities(filterInput);

    expect(this.entityRepository.getAllEntities).toHaveBeenCalled();
  }

  public async createEntity(input) {
    await this.entityService.createEntity(input);

    expect(this.entityRepository.createEntity).toHaveBeenCalled();
    expect(this.entityRepository.createEntity).toHaveBeenCalledWith(input);
  }

  public async updateEntity(input) {
    const id = Types.ObjectId().toHexString();
    const updateEntityInput = {
      where: { id },
      data: input.updateEntityPayload,
    };

    await this.entityService.updateEntity(updateEntityInput);

    expect(this.entityRepository.updateEntity).toHaveBeenCalled();
    expect(this.entityRepository.updateEntity).toHaveBeenCalledWith(
      updateEntityInput,
    );
  }

  public async deleteEntity() {
    const id = Types.ObjectId().toHexString();

    await this.entityService.deleteEntity({ id });

    expect(this.entityRepository.deleteEntity).toHaveBeenCalled();
    expect(this.entityRepository.deleteEntity).toHaveBeenCalledWith({
      id,
    });
  }
}
