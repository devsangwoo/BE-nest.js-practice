import { Field, ID, InputType } from '@nestjs/graphql';
import { IUpdateCustomerPayload } from 'src/customer/interfaces/inputs/update-customer-payload.interface';

@InputType()
export class UpdateCustomerPayload implements IUpdateCustomerPayload {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field((_type) => ID, { nullable: true })
  company: string;
}
