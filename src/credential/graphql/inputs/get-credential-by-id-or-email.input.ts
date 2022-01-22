import { InputType, Field } from '@nestjs/graphql';
import { IGetCredentialByIdOrEmailInput } from 'src/credential/interfaces/inputs/get-credential-by-id-or-email-input.interface';

@InputType()
export class GetCredentialByIdOrEmailInput
  implements IGetCredentialByIdOrEmailInput
{
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  email?: string;
}
