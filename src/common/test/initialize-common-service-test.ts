import { Test } from '@nestjs/testing';
import { entityRepository } from '../data/classes/mock/repository.class';
import { CommonServiceTests } from './common-service-tests';
import { ServiceTestConfigType } from './types/service-test-config-v2.type';

export const initializeCommonServiceTests = async (
  config: ServiceTestConfigType,
) => {
  const {
    EntityRepository,
    EntityService,
    imports = [],
    providers = [],
    customRepository,
  } = config;

  const _entityRepository = customRepository || entityRepository;

  const testModule = await Test.createTestingModule({
    imports,
    providers: [
      {
        provide: EntityRepository,
        useValue: _entityRepository,
      },
      ...providers,
      EntityService,
    ],
  }).compile();

  const entityService = testModule.get<typeof EntityService>(EntityService);
  const commonServiceTests = new CommonServiceTests(
    entityService,
    _entityRepository,
  );

  return { entityService, commonServiceTests };
};
