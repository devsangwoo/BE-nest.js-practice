import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from 'src/common/data/interfaces/update-entity.interface';
import { UpdateCountryPayload } from './update-country.payload';

@InputType()
export class UpdateCountryInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;
  @Field()
  data: UpdateCountryPayload;
}
