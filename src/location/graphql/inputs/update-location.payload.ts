import { IUpdateLocationPayload } from '../../interfaces/inputs/update-location-payload.interface';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateLocationPayload implements IUpdateLocationPayload {
  @Field(_type => Float, { nullable: true })
  latitude?: number;

  @Field(_type => Float, { nullable: true })
  longitude?: number;

  @Field({ nullable: true })
  address?: string;

  @Field(_type => ID, { nullable: true })
  city?: string;

  @Field({ nullable: true })
  zipCode?: string;
}
