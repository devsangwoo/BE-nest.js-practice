import { IUpdateLocationPayload } from '../../interfaces/inputs/update-location-payload.interface';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLocationPayload implements IUpdateLocationPayload {
  @Field(() => Float, { nullable: true })
  latitude?: number;

  @Field(() => Float, { nullable: true })
  longitude?: number;

  @Field({ nullable: true })
  address?: string;

  @Field(() => ID, { nullable: true })
  country?: string;

  @Field({ nullable: true })
  zipCode?: string;
}
