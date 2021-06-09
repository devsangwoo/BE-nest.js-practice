import { Field, InputType } from '@nestjs/graphql';
import { IGetEntityByEmail } from 'src/auth/interfaces/get-entity-by-email.interface';

@InputType()
export class GetEntityByEmail implements IGetEntityByEmail {
  @Field()
  email: string;
}
