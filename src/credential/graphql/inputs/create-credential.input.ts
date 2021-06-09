import { InputType, Field } from '@nestjs/graphql';
import { ICreateCredentialInput } from 'src/credential/interfaces/inputs/create-credential-input.interface';

@InputType('SignInUserInput')
export class CreateCredentialInput implements ICreateCredentialInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
