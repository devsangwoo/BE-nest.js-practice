import { ArgsOptions, ID } from '@nestjs/graphql';

export const graphQlIdArgOption: ArgsOptions = {
  type: () => ID,
};
