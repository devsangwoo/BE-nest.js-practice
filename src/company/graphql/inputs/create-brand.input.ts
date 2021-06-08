import { InputType, Field } from '@nestjs/graphql';
import { ICreateBrandInput } from 'src/brand/interfaces/inputs/create-brand-input.interface';

@InputType()
export class CreateBrandInput implements ICreateBrandInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  visible?: boolean;

  @Field({ nullable: true })
  icon?: string;
}
