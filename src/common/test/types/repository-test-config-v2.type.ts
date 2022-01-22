import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';
import { ModelDefinition } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type RepositoryTestConfigType = {
  Entity: any;
  EntityRepository: any;
  EntitySchema: Schema;
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
  providers?: Provider<any>[];
  mongooseModels?: ModelDefinition[];
  createEntityInput: any;
  createDocument?: () => Promise<any>;
};
