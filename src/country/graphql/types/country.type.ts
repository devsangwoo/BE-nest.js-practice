import { ICountry } from '../../interfaces/entities/country-entity.interface';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Country implements ICountry {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;
}
