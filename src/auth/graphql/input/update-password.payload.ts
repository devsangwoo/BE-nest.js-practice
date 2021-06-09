import { InputType, Field } from '@nestjs/graphql';
import { IUpdatePasswordPayload } from 'src/auth/interfaces/update-password-payload.interface';

@InputType()
export class UpdatePasswordPayload implements IUpdatePasswordPayload {
  @Field()
  oldPassword: string;

  @Field()
  newPassword: string;
}
