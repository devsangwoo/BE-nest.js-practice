import { InputType, Field } from '@nestjs/graphql';
import { IUpdateUserPayload } from '../../interfaces/update-user-payload.interface';

@InputType()
export class UpdateUserPayload implements IUpdateUserPayload {
  @Field({ nullable: true })
  password?: string;
}
