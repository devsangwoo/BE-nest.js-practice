import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Country } from 'src/country/graphql/types/country.type';
import { Customer } from 'src/customer/graphql/types/customer.type';
import { ILocation } from '../../interfaces/entities/location-entity.interface';

@ObjectType()
export class Location implements ILocation {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  latitude: number;

  @Field(() => Float)
  longitude: number;

  @Field()
  address: string;

  @Field(() => Country)
  country: Country;

  @Field(() => Customer)
  customer: Customer;

  @Field()
  zipCode: string;
}
