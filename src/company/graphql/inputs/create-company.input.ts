import { InputType, Field } from '@nestjs/graphql';
import { ICreateCompanyInput } from 'src/company/interfaces/inputs/create-company-input.interface';

@InputType()
export class CreateCompanyInput implements ICreateCompanyInput {
  @Field()
  name: string;

  @Field()
  telephoneNumber: string;
}
