import { Field, InputType, Int } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { IBaseGraphqlFilterInput } from 'src/common/data/interfaces/base-graphql-filter-input.interface';
import { GraphQLSortOperation } from '../filter/operations/sort';

@InputType()
export class FilterInput implements IBaseGraphqlFilterInput {
  @Field((_type) => Int, { nullable: true })
  start?: number;

  @Field((_type) => Int, { nullable: true })
  limit?: number;

  @Field((_type) => GraphQLJSON, { nullable: true })
  sort?: Record<string, GraphQLSortOperation>;

  @Field((_type) => GraphQLJSON, { nullable: true })
  where?: Record<string, any>;
}
