import { InputType, Field } from '@nestjs/graphql';
import { IUpdateEntityCustom } from 'src/auth/interfaces/update-entity.interface';
import { GetEntityByEmail } from './get-entity-by-email.input';
import { UpdatePasswordPayload } from './update-password.payload';

@InputType()
export class UpdatePasswordInput implements IUpdateEntityCustom {
  @Field()
  where: GetEntityByEmail;

  @Field()
  data: UpdatePasswordPayload;
}
