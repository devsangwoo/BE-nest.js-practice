import { InputType, Field } from '@nestjs/graphql';
import { IUpdateCredentialPayload } from 'src/credential/interfaces/inputs/update-credential-payload.interface';

@InputType()
export class UpdateCredentialPasswordPayload
  implements IUpdateCredentialPayload
{
  @Field()
  password: string;
}
