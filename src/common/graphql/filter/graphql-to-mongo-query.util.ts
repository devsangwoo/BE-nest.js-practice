import { paginationBuilder } from './operations/paginate';
import { graphqlToMongoQueryUtil } from './operations/filter';
import { sortBuilder } from './operations/sort';
import { Model, Schema } from 'mongoose';
import { FilterInput } from '../inputs/graphql-filter.input';

export function gqlToMongoQueryBuilder(
  filterInput: FilterInput,
  mongoDbModel: Model<any>,
) {
  const modelObject: Schema<any> = mongoDbModel.schema.obj;

  const { limit, sort, start, where } = filterInput || {};

  let queryBuilder = mongoDbModel.find();

  queryBuilder = paginationBuilder(queryBuilder, start, limit);

  queryBuilder = sortBuilder(queryBuilder, sort, modelObject);

  queryBuilder = graphqlToMongoQueryUtil(queryBuilder, where, modelObject);

  return queryBuilder;
}
