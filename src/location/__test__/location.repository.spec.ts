import { CommonRepositoryTests } from '@common/common/test/common-repository-tests-v2';
import { initializeCommonRepositoryTests } from '@common/common/test/initialize-common-repository-test';
import { Model } from 'mongoose';
import {
  Location,
  LocationSchema,
} from '../../location/database/location.entity';
import { LocationRepository } from '../location.repository';
import { CreateLocationInput } from '../graphql/inputs/create-location.input';
import { UpdateLocationPayload } from '../graphql/inputs/update-location.payload';
import { createDocument } from '@common/common/test/create-document';
import { Country, CountrySchema } from '../../country/database/country.entity';
import { State, StateSchema } from '../../state/database/state.entity';
import { City, CitySchema } from '../../city/database/city.entity';
import { generateSlug } from '@common/common/functions/generate-slug';

const entityName = Location.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<Location>;
  let entityRepository: any;
  let commonRepositoryTests: CommonRepositoryTests;
  let countryModel: Model<Country>;
  let stateModel: Model<State>;
  let cityModel: Model<City>;

  const createEntityInput: CreateLocationInput = {
    address: 'street Jonh F Kennedy, house #10',
    latitude: 10,
    longitude: 20,
    zipCode: '00123',
    city: null,
  };

  const updateEntityPayload: UpdateLocationPayload = {
    address: 'doral #25',
  };

  const createCountry = async () => {
    const name = 'USA';
    const slug = generateSlug([name]);

    const state = new countryModel({
      name,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return await state.save();
  };

  const createSubDocument = async (
    name,
    createParent,
    parentName,
    entityModel,
  ) => {
    const slug = generateSlug([name]);

    const parent = await createParent();
    const createInput = {
      name,
      slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    createInput[parentName] = parent._id;

    const entity = new entityModel(createInput);

    return await entity.save();
  };

  const createState = async () => {
    const entity = await createSubDocument(
      'Florida',
      createCountry,
      Country.name.toLowerCase(),
      stateModel,
    );

    return entity;
  };

  const createCity = async () => {
    const entity = await createSubDocument(
      'Miami',
      createState,
      State.name.toLowerCase(),
      cityModel,
    );

    return entity;
  };

  const _createDocument = async () => {
    const city = await createCity();
    const updatedCreateEntityInput = {
      ...createEntityInput,
      city: city.id,
    };

    const entity = await createDocument(
      entityModel,
      entityRepository,
      updatedCreateEntityInput,
    )();

    return entity;
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: Location,
      EntitySchema: LocationSchema,
      EntityRepository: LocationRepository,
      createEntityInput,
      mongooseModels: [
        {
          name: Country.name,
          schema: CountrySchema,
        },
        {
          name: State.name,
          schema: StateSchema,
        },
        {
          name: City.name,
          schema: CitySchema,
        },
      ],
      createDocument: _createDocument,
    });

    entityModel = config.entityModel;
    entityRepository = config.entityRepository;
    commonRepositoryTests = config.commonRepositoryTests;

    countryModel = config.mongooseTestModels[Country.name];
    stateModel = config.mongooseTestModels[State.name];
    cityModel = config.mongooseTestModels[City.name];
  });

  afterEach(async () => {
    await entityModel.remove({});
    await countryModel.remove({});
    await stateModel.remove({});
    await cityModel.remove({});
  });

  describe(`get${entityName}ById`, () => {
    it(`should throw an error if the given id does not match any existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getEntityByIdError();
    });

    it(`should return the entity if the given id match an existing ${entityName} entity`, async () => {
      await commonRepositoryTests.getEntityById();
    });
  });

  describe(`getAll${entityName}s`, () => {
    it(`should return an empty array if there are no ${entityName}s entities stored in the database`, async () => {
      await commonRepositoryTests.getAllEntitiesError();
    });

    it(`should return an array with one element if there is one ${entityName} entity stored in the database`, async () => {
      await commonRepositoryTests.getAllEntities();
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      const city = await createCity();
      createEntityInput.city = city._id;

      const result = await entityRepository.createEntity(createEntityInput);
      const expectedValue = {
        ...createEntityInput,
        city: city.toObject(),
      };

      expect(result.toObject()).toMatchObject(expectedValue);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.updateEntityError(updateEntityPayload);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      await commonRepositoryTests.updateEntity(updateEntityPayload);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      await commonRepositoryTests.deleteEntityError();
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      await commonRepositoryTests.deleteEntity();
    });
  });
});
