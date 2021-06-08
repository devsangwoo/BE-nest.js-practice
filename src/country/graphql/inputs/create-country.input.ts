import { ICreateCountryInput } from '../../interfaces/inputs/create-country-input.interface';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCountryInput implements ICreateCountryInput {
  @Field()
  name: string;
}
