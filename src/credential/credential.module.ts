import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CredentialSchema, Credential } from './database/credential.entity';
import { CredentialService } from './credential.service';
import { CredentialRepository } from './credential.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Credential.name,
        schema: CredentialSchema,
      },
    ]),
  ],
  exports: [MongooseModule, CredentialService, CredentialRepository],
  providers: [CredentialService, CredentialRepository],
})
export class CredentialModule {}
