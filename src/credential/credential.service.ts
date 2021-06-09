import { Injectable } from '@nestjs/common';
import { ClientSession } from 'mongoose';
import { GetEntityByIdInput } from '../common/data/classes/get-entity-by-id.class';
import { CredentialRepository } from './credential.repository';
import { Credential } from './database/credential.entity';
import { CreateCredentialInput } from './graphql/inputs/create-credential.input';
import { GetCredentialByIdOrEmailInput } from './graphql/inputs/get-credential-by-id-or-email.input';
import { UpdateCredentialPasswordInput } from './graphql/inputs/update-credential-password.input';
import { UpdateCredentialInput } from './graphql/inputs/update-credential.input';

@Injectable()
export class CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository) {}

  public async getCredentialByIdOrEmail(
    getCredentialByIdOrEmailInput: GetCredentialByIdOrEmailInput,
  ): Promise<Credential> {
    return this.credentialRepository.getCredentialByIdOrEmail(
      getCredentialByIdOrEmailInput,
    );
  }

  public async createCredential(
    createCredentialInput: CreateCredentialInput,
    session?: ClientSession,
  ): Promise<Credential> {
    return this.credentialRepository.createCredential(
      createCredentialInput,
      session,
    );
  }

  public async updateCredential(
    updateCredentialInput: UpdateCredentialInput,
  ): Promise<Credential> {
    return this.credentialRepository.updateCredential(updateCredentialInput);
  }

  public async deleteCredential(
    deleteCredentialInput: GetEntityByIdInput,
  ): Promise<Credential> {
    return this.credentialRepository.deleteCredential(deleteCredentialInput);
  }

  public async resetPassword(
    updateCredentialPasswordInput: UpdateCredentialPasswordInput,
    session?: ClientSession,
  ): Promise<Credential> {
    return await this.credentialRepository.updateCredentialPassword(
      updateCredentialPasswordInput,
      session,
    );
  }
}
