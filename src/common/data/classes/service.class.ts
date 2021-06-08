import { Injectable } from '@nestjs/common';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { BaseServiceType } from '../interfaces/base-service-type.interface';
import { GetEntityByIdInput } from './get-entity-by-id.class';

@Injectable()
export abstract class Service<T extends BaseServiceType> {
  constructor(private readonly entityRepository: T['entityRepository']) {}

  public async getEntityById(
    getCategoryByIdInput: GetEntityByIdInput,
  ): Promise<T['entity']> {
    return this.entityRepository.getEntityById(getCategoryByIdInput);
  }

  public async getAllEntities(
    filterInput: FilterInput,
  ): Promise<T['entity'][]> {
    return this.entityRepository.getAllEntities(filterInput);
  }

  public async createEntity(
    createEntityInput: T['createEntityInput'],
  ): Promise<T['entity']> {
    return this.entityRepository.createEntity(createEntityInput);
  }

  public async updateEntity(
    updateEntityInput: T['updateEntityInput'],
  ): Promise<T['entity']> {
    return this.entityRepository.updateEntity(updateEntityInput);
  }

  public async deleteEntity(
    deleteEntityInput: GetEntityByIdInput,
  ): Promise<T['entity']> {
    return this.entityRepository.deleteEntity(deleteEntityInput);
  }
}
