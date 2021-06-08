import { Document } from 'mongoose';
import { Repository } from '../classes/repository.class';
import { BaseRepositoryType } from './base-repository-type.interface';

export interface BaseServiceType {
  entity: Document;
  entityRepository: Repository<BaseRepositoryType>;
  createEntityInput: any;
  updateEntityInput: any;
}
