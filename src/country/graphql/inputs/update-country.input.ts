import { InputType, Field } from '@nestjs/graphql';
import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { UpdateCountryPayload } from './update-country.payload';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';

@InputType()
export class UpdateCountryInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;
  @Field()
  data: UpdateCountryPayload;
}
