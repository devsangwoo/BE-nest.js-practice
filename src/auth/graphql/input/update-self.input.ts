import { InputType, Field } from '@nestjs/graphql';
import { GetEntityByIdInput } from 'src/common/data/classes/get-entity-by-id.class';
import { IUpdateEntity } from 'src/common/data/interfaces/update-entity.interface';
import { UpdateSelfPayload } from './update-self.payload';

@InputType()
export class UpdateSelfInput implements IUpdateEntity {
  @Field()
  where: GetEntityByIdInput;

  @Field()
  data: UpdateSelfPayload;
}
