import { InputType, Field } from '@nestjs/graphql';
import { IUpdateUserPayload } from '../../interfaces/update-user-payload.interface';

@InputType()
export class UpdateUserPayload implements IUpdateUserPayload {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  profilePicture?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  password?: string;
}
