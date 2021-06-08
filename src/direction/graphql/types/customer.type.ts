import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Company } from 'src/company/graphql/types/company.type';
import { ICustomer } from 'src/customer/interfaces/entities/customer-entity.interface';

@ObjectType()
export class Customer implements ICustomer {
  @Field((_type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  telephoneNumber: string;

  @Field((_type) => Company)
  company: Company;

  @Field((_type) => [string])
  directions: string[];
}
