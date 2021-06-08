import { Field, InputType } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from 'src/common/data/interfaces/update-entity.interface';
import { UpdateLocationPayload } from './update-location.payload';

@InputType()
export class UpdateLocationInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateLocationPayload;
}
