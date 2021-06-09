import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPayload } from './update-credential.payload';

@InputType()
export class UpdateCredentialInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPayload;
}
