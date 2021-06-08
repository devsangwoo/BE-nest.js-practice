import { Types } from 'mongoose';
import { EntryNotFoundException } from '../errors/errors';
import { FilterInput } from '../graphql/inputs/graphql-filter.input';
import { createDocument } from './create-document';

export class CommonRepositoryTests {
  private readonly entityRepository;
  private readonly createEntityInput;
  public readonly createDocument;

  constructor(
    _entityRepository,
    _entityModel,
    _createEntityInput,
    _createDocument?,
  ) {
    this.entityRepository = _entityRepository;
    this.createEntityInput = _createEntityInput;
    this.createDocument =
      _createDocument ||
      createDocument(_entityModel, _entityRepository, _createEntityInput);
  }

  public async getEntityById() {
    const entity = await this.createDocument();

    const result = await this.entityRepository.getEntityById({ id: entity.id });

    expect(result.toObject()).toEqual(entity.toObject());
  }

  public async getEntityByIdError() {
    const id = Types.ObjectId().toHexString();

    const result = this.entityRepository.getEntityById({ id });

    await expect(result).rejects.toThrow(EntryNotFoundException);
  }

  public async getAllEntities(filterInput: FilterInput = {}) {
    const entity = await this.createDocument();

    const result = await this.entityRepository.getAllEntities(filterInput);

    expect(result.length).toEqual(1);
    expect(result[0].toObject()).toEqual(entity.toObject());
  }

  public async getAllEntitiesError() {
    const result = await this.entityRepository.getAllEntities({});

    expect(result.length).toBe(0);
    expect(result).toEqual([]);
  }

  public async createEntity() {
    const result = await this.entityRepository.createEntity(
      this.createEntityInput,
    );

    expect(result.toObject()).toMatchObject(this.createEntityInput);
  }

  public async updateEntity(input) {
    const entity = await this.createDocument();

    const updateEntityInput = {
      where: { id: entity.id },
      data: input,
    };

    const result = await this.entityRepository.updateEntity(updateEntityInput);

    expect(entity.toObject()).not.toMatchObject(input);
    expect(result.toObject()).toMatchObject(input);
  }

  public async updateEntityError(input) {
    const id = Types.ObjectId().toHexString();
    const updateEntityInput = {
      where: { id },
      data: input,
    };
    const result = this.entityRepository.updateEntity(updateEntityInput);
    await expect(result).rejects.toThrow(EntryNotFoundException);
  }

  public async deleteEntity() {
    const entity = await this.createDocument();
    const result = await this.entityRepository.deleteEntity({ id: entity.id });

    expect(result.deleted).toBe(true);
  }

  public async deleteEntityError() {
    const id = Types.ObjectId().toHexString();
    const result = this.entityRepository.deleteEntity({ id });

    await expect(result).rejects.toThrow(EntryNotFoundException);
  }
}
