import { Field, InputType } from '@nestjs/graphql';
import { IUpdateCompanyPayload } from 'src/company/interfaces/inputs/update-company-payload.interface';

@InputType()
export class UpdateCompanyPayload implements IUpdateCompanyPayload {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  telephoneNumber?: string;
}
