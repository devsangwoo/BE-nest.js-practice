import { Field, InputType } from '@nestjs/graphql';
import { IGetEntitiesByDateRange } from 'src/common/data/interfaces/get-entities-by-date-range.interface';

@InputType()
export class GetEntitiesByDateRangeInput implements IGetEntitiesByDateRange {
  @Field({ nullable: true })
  from: string;

  @Field({ nullable: true })
  to: string;
}
