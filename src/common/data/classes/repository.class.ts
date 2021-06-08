import { Injectable, Logger } from '@nestjs/common';
import { EntryNotFoundException } from 'src/common/errors/errors';
import {
  createEntityLog,
  deleteEntityLog,
  getEntitiesLog,
  getEntityByIdLog,
  updateEntityLog,
} from 'src/common/functions/log-message-builder';
import { updateEntities } from 'src/common/functions/update-entities';
import { validateAndGenerateSlug } from 'src/common/functions/validate-and-generate-slug';
import { gqlToMongoQueryBuilder } from 'src/common/graphql/filter/graphql-to-mongo-query.util';
import { FilterInput } from 'src/common/graphql/inputs/graphql-filter.input';
import { BaseRepositoryType } from '../interfaces/base-repository-type.interface';
import { slugConfigType } from '../types/slugConfig.type';
import { GetEntityByIdInput } from './get-entity-by-id.class';

@Injectable()
export abstract class Repository<T extends BaseRepositoryType> {
  constructor(
    private readonly entityModel: T['entityModel'],
    private entityName: string,
    public readonly slugConfig: slugConfigType = {
      keys: ['name'],
      isUnique: false,
    },
  ) {}

  protected readonly logger = new Logger();

  public async getEntityById(
    getEntityInput: GetEntityByIdInput,
  ): Promise<T['entity']> {
    try {
      this.logger.log(getEntityByIdLog(this.entityName, getEntityInput));

      const result = await this.entityModel
        .findOne(getEntityInput as any)
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async getAllEntities(
    filterInput: FilterInput,
  ): Promise<T['entity'][]> {
    try {
      this.logger.log(getEntitiesLog(this.entityName, filterInput));

      const query = gqlToMongoQueryBuilder(filterInput, this.entityModel);

      const result: T['entity'][] = await query.exec();

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async createEntity(
    createEntityInput: T['createEntityInput'],
  ): Promise<T['entity']> {
    try {
      this.logger.log(createEntityLog(this.entityName, createEntityInput));

      const slug = validateAndGenerateSlug(
        this.entityModel,
        this.slugConfig,
        createEntityInput,
      );

      const result = new this.entityModel({
        ...createEntityInput,
        slug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return result.save();
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async updateEntity(
    updateEntityInput: T['updateEntityInput'],
  ): Promise<T['entity']> {
    try {
      this.logger.log(updateEntityLog(this.entityName, updateEntityInput));

      const { data, where } = updateEntityInput;

      const updateEntity = updateEntities(data);

      //TODO: Make this work with all the slugConfig keys
      if (data[this.slugConfig.keys[0]]) {
        updateEntity['slug'] = validateAndGenerateSlug(
          this.entityModel,
          this.slugConfig,
          data,
        );
      }

      const result = await this.entityModel
        .findOneAndUpdate(where, updateEntity, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }

  public async deleteEntity(
    deleteEntityInput: T['deleteEntityInput'],
  ): Promise<T['entity']> {
    try {
      this.logger.log(deleteEntityLog(this.entityName, deleteEntityInput));

      const deleteEntity = {
        deleted: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.entityModel
        .findOneAndUpdate(deleteEntityInput as any, deleteEntity as any, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      this.logger.error(`${JSON.stringify(error)}`);
      throw error;
    }
  }
}
