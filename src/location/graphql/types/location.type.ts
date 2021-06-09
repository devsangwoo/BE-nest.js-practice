import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Country } from 'src/country/graphql/types/country.type';
import { Customer } from 'src/customer/graphql/types/customer.type';
import { ILocation } from '../../interfaces/entities/location-entity.interface';

@ObjectType()
export class Location implements ILocation {
  @Field((_type) => ID)
  id: string;

  @Field((_type) => Float)
  latitude: number;

  @Field((_type) => Float)
  longitude: number;

  @Field()
  address: string;

  @Field((_type) => Country)
  country: Country;

  @Field((_type) => Customer)
  customer: Customer;

  @Field()
  zipCode: string;
}
