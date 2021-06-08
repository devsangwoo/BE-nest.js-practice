import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { City } from 'apps/catalog/src/city/graphql/types/city.type';
import { ILocation } from '../../interfaces/entities/location-entity.interface';

@ObjectType()
export class Location implements ILocation {
  @Field(_type => ID)
  id: string;

  @Field(_type => Float)
  latitude: number;

  @Field(_type => Float)
  longitude: number;

  @Field()
  address: string;

  @Field(_type => City)
  city: City;

  @Field()
  zipCode: string;
}
