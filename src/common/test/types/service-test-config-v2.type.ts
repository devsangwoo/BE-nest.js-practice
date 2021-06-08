import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';

export type ServiceTestConfigType = {
  EntityService: any;
  EntityRepository: any;
  customRepository?: any;
  providers?: Provider<any>[];
  imports?: (
    | Type<any>
    | DynamicModule
    | Promise<DynamicModule>
    | ForwardReference<any>
  )[];
};
