import { InputType, Field } from '@nestjs/graphql';
import { ICreateCompanyInput } from 'src/company/interfaces/inputs/create-company-input.interface';

@InputType()
export class CreateCustomerInput implements ICreateCompanyInput {
  @Field()
  name: string;

  @Field()
  telephoneNumer: string;
}
