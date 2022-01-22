import { Model, Document } from 'mongoose';
import { GetEntityByIdInput } from '../classes/get-entity-by-id.class';

export interface BaseRepositoryType {
  entity: Document;
  entityModel: Model<Document>;
  createEntityInput: any;
  updateEntityInput: any;
  deleteEntityInput: any | GetEntityByIdInput;
}
