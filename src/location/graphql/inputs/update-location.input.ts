import { IUpdateEntity } from '@common/common/data/interfaces/update-entity.interface';
import { Field, InputType } from '@nestjs/graphql';
import { UpdateLocationPayload } from './update-location.payload';
import { GetEntityByIdInput } from '@common/common/data/classes/get-entity-by-id.class';

@InputType()
export class UpdateLocationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateLocationPayload;
}
