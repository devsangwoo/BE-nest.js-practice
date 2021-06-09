import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from 'src/common/data/interfaces/update-entity.interface';
import { UpdateUserPayload } from './update-user.payload';

@InputType()
export class UpdateUserInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;
  @Field()
  data: UpdateUserPayload;
}
