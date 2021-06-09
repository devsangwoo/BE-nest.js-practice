import { InputType, Field } from '@nestjs/graphql';
import { IUpdateCredentialPayload } from 'src/credential/interfaces/inputs/update-credential-payload.interface';

@InputType()
export class UpdateCredentialPayload implements IUpdateCredentialPayload {
  @Field({ nullable: true })
  confirmed?: boolean;

  @Field({ nullable: true })
  blocked?: boolean;
}
