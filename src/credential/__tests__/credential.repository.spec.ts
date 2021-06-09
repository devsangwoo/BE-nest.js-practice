import { Model, Types } from 'mongoose';
import { CreateCredentialInput } from '../graphql/inputs/create-credential.input';
import { Credential, CredentialSchema } from '../database/credential.entity';
import { CredentialRepository } from '../credential.repository';
import { UpdateCredentialPayload } from '../graphql/inputs/update-credential.payload';
import { UpdateCredentialPasswordInput } from '../graphql/inputs/update-credential-password.input';
import { initializeCommonRepositoryTests } from '../../common/test/initialize-common-repository-test';
import { EntryNotFoundException } from '../../common/errors/errors';

const entityName = Credential.name;

describe(`${entityName} Repository`, () => {
  let entityModel: Model<Credential>;
  let entityRepository: any;
  let createDocument;

  const createEntityInput: CreateCredentialInput = {
    email: 'test@email.com',
    password: 'password',
  };

  const updateEntityPayload: UpdateCredentialPayload = {
    blocked: true,
  };

  beforeAll(async () => {
    const config = await initializeCommonRepositoryTests({
      Entity: Credential,
      EntitySchema: CredentialSchema,
      EntityRepository: CredentialRepository,
      createEntityInput,
    });

    entityModel = config.entityModel;
    entityRepository = config.entityRepository;

    createDocument = config.commonRepositoryTests.createDocument;
  });

  afterEach(async () => {
    await entityModel.deleteMany({});
  });

  describe(`get${entityName}ByIdOrEmail`, () => {
    it(`should throw an error if the given id does not match any existing ${entityName} entity`, async () => {
      const result = entityRepository.getCredentialByIdOrEmail({ id: 'test' });

      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should throw an error if the given email does not match any existing ${entityName} entity`, async () => {
      const result = entityRepository.getCredentialByIdOrEmail({
        email: 'test',
      });

      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should return the entity if the given id match an existing ${entityName} entity`, async () => {
      const entity = await createDocument();

      const result = await entityRepository.getCredentialByIdOrEmail({
        id: entity.id,
      });

      expect(result.toObject()).toEqual(entity.toObject());
    });

    it(`should return the entity if the given email match an existing ${entityName} entity`, async () => {
      const entity = await createDocument();

      const result = await entityRepository.getCredentialByIdOrEmail({
        email: entity.email,
      });

      expect(result.toObject()).toEqual(entity.toObject());
    });
  });

  describe(`create${entityName}`, () => {
    it(`should create an ${entityName} entity given a valid input`, async () => {
      const result = await entityRepository.createCredential(createEntityInput);

      expect(result.email).toBe(createEntityInput.email);
    });
  });

  describe(`update${entityName}`, () => {
    it(`should throw an error if an id of a not existing ${entityName} entity is provided`, async () => {
      const id = Types.ObjectId().toHexString();
      const updateEntityInput = {
        where: { id },
        data: updateEntityPayload,
      };

      const result = entityRepository.updateCredential(updateEntityInput);
      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should update the ${entityName} entity that match the given id, if valid fields are provided`, async () => {
      const entity = await createDocument();

      const updateEntityInput = {
        where: { id: entity.id },
        data: updateEntityPayload,
      };

      const result = await entityRepository.updateCredential(updateEntityInput);

      expect(entity.toObject()).not.toMatchObject(updateEntityPayload);
      expect(result.toObject()).toMatchObject(updateEntityPayload);
    });
  });

  describe(`update${entityName}Password`, () => {
    it(`should update the ${entityName} password given a valid input`, async () => {
      const entity = await createDocument();

      const updateCredentialPasswordInput: UpdateCredentialPasswordInput = {
        where: {
          id: entity.id,
        },
        data: {
          password: 'newPass',
        },
      };

      const result = await entityRepository.updateCredentialPassword(
        updateCredentialPasswordInput,
      );

      expect(result.password).not.toBe(entity.password);
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should throw an error if an id of a non-existing ${entityName} entity is provided`, async () => {
      const id = Types.ObjectId().toHexString();
      const result = entityRepository.deleteCredential({ id });

      await expect(result).rejects.toThrow(EntryNotFoundException);
    });

    it(`should mark as deleted the ${entityName} entity that match with the given id`, async () => {
      const entity = await createDocument();
      const result = await entityRepository.deleteCredential({
        id: entity.id,
      });

      expect(result.deleted).toBe(true);
    });
  });
});
