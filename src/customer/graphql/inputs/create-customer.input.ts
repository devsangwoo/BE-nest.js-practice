import { InputType, Field, ID } from '@nestjs/graphql';
import { ICreateCustomerInput } from 'src/customer/interfaces/inputs/create-customer-input.interface';

@InputType()
export class CreateCustomerInput implements ICreateCustomerInput {
  @Field()
  name: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  telephoneNumber: string;

  @Field(() => ID)
  company: string;
}
