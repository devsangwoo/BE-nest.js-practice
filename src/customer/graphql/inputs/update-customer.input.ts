import { UpdateCustomerPayload } from './update-customer.payload';
import { InputType, Field } from '@nestjs/graphql';
import { IUpdateEntity } from 'src/common/data/interfaces/update-entity.interface';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';

@InputType()
export class UpdateCustomerInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateCustomerPayload;
}
