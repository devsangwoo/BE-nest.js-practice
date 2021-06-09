import { InputType, Field } from '@nestjs/graphql';
import { IUpdateUserPayload } from '../../interfaces/update-user-payload.interface';

@InputType()
export class UpdateSelfPayload implements IUpdateUserPayload {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;
}
