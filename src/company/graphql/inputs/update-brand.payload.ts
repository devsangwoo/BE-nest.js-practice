import { Field, InputType } from '@nestjs/graphql';
import { IUpdateBrandPayload } from 'src/brand/interfaces/inputs/update-brand-payload.interface';

@InputType()
export class UpdateBrandPayload implements IUpdateBrandPayload {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  visible?: boolean;

  @Field({ nullable: true })
  icon?: string;
}
