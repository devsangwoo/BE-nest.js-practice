import { ModelDefinition } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type RepositoryTestConfigType = {
  Entity: any;
  EntitySchema: Schema;
  EntityRepository: any;
  Entities?: ModelDefinition[];
  Inputs: {
    createEntityInput: any;
    updateEntityPayload: any;
  };
  InputTypes: {
    UpdateEntityInput: any;
  };
};
