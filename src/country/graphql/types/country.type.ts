import { ICountry } from '../../interfaces/entities/country-entity.interface';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { State } from 'apps/catalog/src/state/graphql/types/state.type';

@ObjectType()
export class Country implements ICountry {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(_type => [State])
  states: State[];
}
