import { DocumentQuery, Document, Schema } from 'mongoose';
import { registerEnumType } from '@nestjs/graphql';
import { hasObjectField } from './utils';
import {
  FieldNotDefinedError,
  GqlOperationNotDefinedError,
} from 'src/common/errors/errors';

export enum GraphQLSortOperation {
  asc = 'asc',
  desc = 'desc',
}

enum SortOperation {
  asc = 1,
  desc = -1,
}

registerEnumType(GraphQLSortOperation, {
  name: 'GraphQLSortOperation',
});

const gqlSortoperationToMongoSortOperation: Record<
  GraphQLSortOperation,
  SortOperation
> = {
  asc: SortOperation.asc,
  desc: SortOperation.desc,
};

export function sortBuilder(
  queryBuilder: DocumentQuery<Document[], Document>,
  sortOptions: Record<string, any>,
  checkObject: Schema<any>,
) {
  const convertedSortObject = {};
  try {
    if (sortOptions) {
      const sortingFieldNames = Object.keys(sortOptions);

      for (const fieldName of sortingFieldNames) {
        const checkResult: boolean = hasObjectField(checkObject, fieldName);

        if (!checkResult) {
          throw new FieldNotDefinedError(fieldName);
        }

        const gqlSortOperation: GraphQLSortOperation = sortOptions[fieldName];
        const mongoSortOperation =
          gqlSortoperationToMongoSortOperation[gqlSortOperation];

        if (!mongoSortOperation) {
          throw new GqlOperationNotDefinedError(gqlSortOperation);
        }

        convertedSortObject[fieldName] = mongoSortOperation;
      }

      queryBuilder.sort(convertedSortObject);
    }
  } catch (error) {
    throw error;
  }

  return queryBuilder;
}
