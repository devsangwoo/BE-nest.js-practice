import { ObjectType, ID, Field } from '@nestjs/graphql';
import { ICompany } from 'src/company/interfaces/entities/company-entity.interface';

@ObjectType()
export class Company implements ICompany {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  telephoneNumber: string;

  @Field((_type) => [string])
  clients: string[];
}
