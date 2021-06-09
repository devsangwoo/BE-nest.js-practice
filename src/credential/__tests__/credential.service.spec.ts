import { Test } from '@nestjs/testing';
import { Credential } from '../database/credential.entity';
import { CredentialService } from '../credential.service';
import { CreateCredentialInput } from '../graphql/inputs/create-credential.input';
import { CredentialRepository } from '../credential.repository';
import { UpdateCredentialPayload } from '../graphql/inputs/update-credential.payload';
import { UpdateCredentialInput } from '../graphql/inputs/update-credential.input';
import { UpdateCredentialPasswordInput } from '../graphql/inputs/update-credential-password.input';
import { Types } from 'mongoose';

const entityName = Credential.name;

describe(`${entityName} Service`, () => {
  let entityService: CredentialService;

  const createEntityInput: CreateCredentialInput = {
    email: 'test@email.com',
    password: 'password',
  };

  const updateEntityPayload: UpdateCredentialPayload = {
    blocked: true,
  };

  const entityRepository = {
    getCredentialByIdOrEmail: jest.fn(),
    createCredential: jest.fn(),
    updateCredential: jest.fn(),
    deleteCredential: jest.fn(),
    updateCredentialPassword: jest.fn(),
  };

  beforeAll(async () => {
    const testModule = await Test.createTestingModule({
      providers: [
        {
          provide: CredentialRepository,
          useValue: entityRepository,
        },
        CredentialService,
      ],
    }).compile();

    entityService = testModule.get<CredentialService>(CredentialService);
  });

  describe(`get${entityName}ById`, () => {
    it(`should call the getCredentialByIdOrEmail method of the ${entityName}Repository`, async () => {
      const email = { email: 'test@email.com' };
      await entityService.getCredentialByIdOrEmail(email);

      expect(entityRepository.getCredentialByIdOrEmail).toHaveBeenCalled();
      expect(entityRepository.getCredentialByIdOrEmail).toHaveBeenCalledWith(
        email,
      );
    });
  });

  describe(`create${entityName}`, () => {
    it(`should call the createCredential method of the ${entityName}Repository`, async () => {
      await entityService.createCredential(createEntityInput);

      expect(entityRepository.createCredential).toHaveBeenCalled();
      expect(entityRepository.createCredential).toHaveBeenCalledWith(
        createEntityInput,
        undefined,
      );
    });
  });

  describe(`update${entityName}`, () => {
    it(`should call the updateCredential method of the ${entityName}Repository`, async () => {
      const updateEntityInput: UpdateCredentialInput = {
        where: { email: 'test@email.com' },
        data: {
          ...updateEntityPayload,
        },
      };
      await entityService.updateCredential(updateEntityInput);

      expect(entityRepository.updateCredential).toHaveBeenCalled();
      expect(entityRepository.updateCredential).toHaveBeenCalledWith(
        updateEntityInput,
      );
    });
  });

  describe(`delete${entityName}`, () => {
    it(`should call the deleteCredential method of the ${entityName}Repository`, async () => {
      const id = Types.ObjectId().toHexString();

      await entityService.deleteCredential({ id });

      expect(entityRepository.deleteCredential).toHaveBeenCalled();
      expect(entityRepository.deleteCredential).toHaveBeenCalledWith({
        id,
      });
    });
  });

  describe(`resetPassword`, () => {
    it(`should call the updateCredentialPassword method of the ${entityName}Repository`, async () => {
      const email = 'test@email.com';
      const password = 'password2';

      const updateEntityInput: UpdateCredentialPasswordInput = {
        where: { email },
        data: {
          password,
        },
      };

      await entityService.resetPassword(updateEntityInput);

      expect(entityRepository.updateCredentialPassword).toHaveBeenCalled();
      expect(entityRepository.updateCredentialPassword).toHaveBeenCalledWith(
        updateEntityInput,
        undefined,
      );
    });
  });
});
