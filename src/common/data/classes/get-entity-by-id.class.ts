import { Field, ID, InputType } from '@nestjs/graphql';
import { IGetEntityById } from '../interfaces/get-entity-by-id.interface';

@InputType()
export class GetEntityByIdInput implements IGetEntityById {
  @Field(_type => ID)
  id: string;
}
