import { ICreateLocationInput } from '../../interfaces/inputs/create-location-input.interface';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput implements ICreateLocationInput {
  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field(() => ID)
  country: string;

  @Field()
  zipCode: string;

  @Field(() => ID)
  customer: string;
}
