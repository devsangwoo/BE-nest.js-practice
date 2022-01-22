import {
  MongooseOperations,
  GraphQlOperations,
  graphQltoMongo,
  GraphQlOperationsEnum,
  MongooseOperationsEnum,
} from '../graphql-to-mongo.util';
import { DocumentQuery, Document, Schema } from 'mongoose';
import { hasObjectField } from './utils';
import {
  FieldNotDefinedError,
  GqlOperationNotDefinedError,
} from 'src/common/errors/errors';

export function graphqlToMongoQueryUtil(
  queryBuilder: DocumentQuery<Document[], Document>,
  filterOptions: Record<string, any>,
  checkObject: Schema<any>,
) {
  filterOptions = filterOptions || {};

  const convertedFilterObject: Record<string, any> = {};

  const fields = Object.keys(filterOptions);

  try {
    for (const field of fields) {
      // Get filter value
      const filterValue = filterOptions[field];

      const { fieldName, mongoOperation, graphqlOperation } =
        extractMongoDbOperationAndFieldName(field);

      const checkResult = hasObjectField(checkObject, fieldName);

      if (!checkResult) {
        throw new FieldNotDefinedError(fieldName);
      }

      //throw error if operation is not found
      if (!mongoOperation) {
        throw new GqlOperationNotDefinedError(graphqlOperation);
      }

      //Build operation object
      const operationObject = getMongoOperationObject(
        mongoOperation,
        graphqlOperation,
        filterValue,
      );

      convertedFilterObject[fieldName] = {
        ...convertedFilterObject[fieldName],
        ...operationObject,
      };
    }

    queryBuilder.where(convertedFilterObject);

    return queryBuilder;
  } catch (error) {
    throw error;
  }
}

function extractMongoDbOperationAndFieldName(filter: string) {
  let mongoOperation: MongooseOperations;
  let graphqlOperation: GraphQlOperations;

  // Get field name and operation
  const fieldOperation = filter.split('_');

  // Get field name
  const fieldName = fieldOperation[0];

  //Get mongo operation based on graphql operation
  if (fieldOperation.length == 2) {
    graphqlOperation = <GraphQlOperations>fieldOperation[1];
    mongoOperation = graphQltoMongo[graphqlOperation];
  } else {
    mongoOperation = graphQltoMongo[GraphQlOperationsEnum.eq];
  }

  return { fieldName, mongoOperation, graphqlOperation };
}

function getMongoOperationObject(
  mongoOperation: MongooseOperations,
  graphqlOperation: GraphQlOperations,
  value: any,
) {
  const operationObject = {};

  switch (mongoOperation) {
    case MongooseOperationsEnum.$near:
      operationObject[mongoOperation] = nearOperationFormatter(value);
      break;

    case MongooseOperationsEnum.$regex:
      operationObject[mongoOperation] =
        graphqlOperation == GraphQlOperationsEnum.contains
          ? regexContainsOperationFormatter(value)
          : regexNotContainsOperationFormatter(value);
      operationObject['$options'] = 'i';
      break;

    default:
      operationObject[mongoOperation] = value;
      break;
  }

  return operationObject;
}

function nearOperationFormatter(point: {
  longitude: number;
  latitude: number;
}) {
  const { latitude, longitude } = point;
  const nearOperation = {
    $maxDistance: 20000,
    $geometry: { type: 'Point', coordinates: [longitude, latitude] },
  };

  return nearOperation;
}

function regexContainsOperationFormatter(text: string): string {
  let expression = '.*';

  for (const c of text) {
    expression += `${c}.?`;
  }

  expression += '.*';

  return expression;
}

function regexNotContainsOperationFormatter(text: string): string {
  return `^((?!.*${text}.*).)*$`;
}
