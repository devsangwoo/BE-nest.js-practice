import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Credential } from './database/credential.entity';
import { ClientSession, Model } from 'mongoose';
import {
  EntryNotFoundException,
  InvalidFieldValueException,
} from '../common/errors/errors';
import { GetCredentialByIdOrEmailInput } from './graphql/inputs/get-credential-by-id-or-email.input';
import { CreateCredentialInput } from './graphql/inputs/create-credential.input';
import { UpdateCredentialInput } from './graphql/inputs/update-credential.input';
import { updateEntities } from '../common/functions/update-entities';
import { UpdateCredentialPayload } from './graphql/inputs/update-credential.payload';
import { UpdateCredentialPasswordInput } from './graphql/inputs/update-credential-password.input';
import { GetEntityByIdInput } from '../common/data/classes/get-entity-by-id.class';
import {
  createEntityLog,
  deleteEntityLog,
  getEntityByIdLog,
  updateEntityLog,
} from 'src/common/functions/log-message-builder';

@Injectable()
export class CredentialRepository {
  constructor(
    @InjectModel(Credential.name)
    private readonly credentialModel: Model<Credential>,
  ) {}

  private readonly logger = new Logger();

  public async getCredentialByIdOrEmail(
    getCredentialByIdOrEmailInput: GetCredentialByIdOrEmailInput,
  ): Promise<Credential> {
    try {
      this.logger.log(
        getEntityByIdLog(Credential.name, getCredentialByIdOrEmailInput),
      );

      const result = await this.credentialModel
        .findOne(getCredentialByIdOrEmailInput)
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async createCredential(
    createCredentialInput: CreateCredentialInput,
    session?: ClientSession,
  ): Promise<Credential> {
    try {
      this.logger.log(createEntityLog(Credential.name, {}));

      const credential = new this.credentialModel({
        ...createCredentialInput,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      if (session) return credential.save({ session });

      return credential.save();
    } catch (error) {
      throw error;
    }
  }

  public async updateCredential(
    updateCredentialInput: UpdateCredentialInput,
  ): Promise<Credential> {
    try {
      this.logger.log(updateEntityLog(Credential.name, {}));

      const { data, where } = updateCredentialInput;

      if (data.confirmed == false) {
        throw new InvalidFieldValueException('confirmed');
      }

      const updateCredential: UpdateCredentialPayload = updateEntities(data);

      const result = await this.credentialModel
        .findOneAndUpdate(where, updateCredential, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateCredentialPassword(
    updateCredentialInput: UpdateCredentialPasswordInput,
    session?: ClientSession,
  ): Promise<Credential> {
    try {
      this.logger.log(updateEntityLog(Credential.name, {}));

      const { data, where } = updateCredentialInput;

      const credential = await this.credentialModel.findOne(where);

      if (!credential) {
        throw new EntryNotFoundException();
      }

      credential.password = data.password;

      if (session) return credential.save({ session });

      return await credential.save();
    } catch (error) {
      throw error;
    }
  }

  public async deleteCredential(
    deleteCredentialInput: GetEntityByIdInput,
  ): Promise<Credential> {
    try {
      this.logger.log(deleteEntityLog(Credential.name, {}));

      const deleteCredential = {
        deleted: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.credentialModel
        .findOneAndUpdate(deleteCredentialInput, deleteCredential, {
          useFindAndModify: false,
          new: true,
        })
        .exec();

      if (!result) {
        throw new EntryNotFoundException();
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
}
