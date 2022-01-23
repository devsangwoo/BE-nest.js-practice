import { ObjectType, ID, Field } from '@nestjs/graphql';
import { ICompany } from 'src/company/interfaces/entities/company-entity.interface';
import { Customer } from 'src/customer/graphql/types/customer.type';

@ObjectType()
export class Company implements ICompany {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  telephoneNumber: string;

  @Field(() => [Customer])
  customers: Customer[];
}
