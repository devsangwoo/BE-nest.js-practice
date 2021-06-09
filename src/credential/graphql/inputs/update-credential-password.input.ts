import { InputType, Field } from '@nestjs/graphql';
import { GetCredentialByIdOrEmailInput } from './get-credential-by-id-or-email.input';
import { UpdateCredentialPasswordPayload } from './update-credential-password.payload';

@InputType()
export class UpdateCredentialPasswordInput {
  @Field()
  where: GetCredentialByIdOrEmailInput;

  @Field()
  data: UpdateCredentialPasswordPayload;
}
