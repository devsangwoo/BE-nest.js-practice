import { Provider } from '@nestjs/common';

export type ServiceTestConfigType = {
  Entity: any;
  EntityService: any;
  EntityRepository: any;
  InjectRepositories?: Provider<any>[];
  Inputs: {
    createEntityInput: any;
    updateEntityPayload: any;
  };
  InputTypes: {
    UpdateEntityInput: any;
  };
};
