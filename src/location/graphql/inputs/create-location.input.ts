import { ICreateLocationInput } from '../../interfaces/inputs/create-location-input.interface';
import { InputType, Field, Float, ID } from '@nestjs/graphql';

@InputType()
export class CreateLocationInput implements ICreateLocationInput {
  @Field((_type) => Float)
  latitude: number;

  @Field((_type) => Float)
  longitude: number;

  @Field()
  address: string;

  @Field((_type) => ID)
  country: string;

  @Field()
  zipCode: string;
}
