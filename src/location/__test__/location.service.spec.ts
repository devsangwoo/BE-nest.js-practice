import { CommonServiceTests } from '@common/common/test/common-service-tests-v2';
import { initializeCommonServiceTests } from '@common/common/test/initialize-common-service-test';
import { LocationRepository } from '../location.repository';
import { LocationService } from '../location.service';
import { Location } from '../database/location.entity';
import { CreateLocationInput } from '../graphql/inputs/create-location.input';
import { UpdateLocationPayload } from '../graphql/inputs/update-location.payload';

const entityName = Location.name;

describe(`${entityName} Service`, () => {
  const entityName = Location.name;
  let commonServiceTests: CommonServiceTests;

  const createEntityInput: CreateLocationInput = {
    address: 'street Jonh F Kennedy, house #10',
    latitude: 10,
    longitude: 20,
    zipCode: '00123',
    city: undefined,
  };

  const updateEntityPayload: UpdateLocationPayload = {
    address: 'doral #25',
  };

  beforeAll(async () => {
    const config = await initializeCommonServiceTests({
      EntityService: LocationService,
      EntityRepository: LocationRepository,
    });

    commonServiceTests = config.commonServiceTests;
  });

  describe(`get${entityName}ById`, () => {
    it(`should call the getEntityById method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getEntityById();
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should call the getAllEntities method of the ${entityName}Repository`, async () => {
      await commonServiceTests.getAllEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.createEntity(createEntityInput);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteEntity method of the ${entityName}Repository`, async () => {
      await commonServiceTests.deleteEntity();
    });
  });
});
