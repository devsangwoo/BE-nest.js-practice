import { IUpdateContryPayload } from '../../interfaces/inputs/update-country-payload.interface';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCountryPayload implements IUpdateContryPayload {
  @Field()
  name: string;
}
