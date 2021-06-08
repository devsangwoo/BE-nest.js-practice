import { UserInputError, ApolloError } from 'apollo-server-express';
import { ErrorMessage } from './enums/error-message-types.enum';
import {
  buildOperationErrorMessage,
  buildTypeErrorMessage,
} from './utils/error-builders';

export class InvalidFunctionInputError extends Error {
  constructor() {
    super(ErrorMessage.InvalidFunctionInput);
  }
}

export class BadImplementationException extends Error {
  constructor() {
    super(ErrorMessage.BadImplementationErrorMessage);
  }
}

export class TestFailedError extends Error {
  constructor() {
    super(ErrorMessage.TestFailedErrorMessage);
  }
}

export class InvalidSignInMethodError extends Error {
  constructor() {
    super(ErrorMessage.InvalidSignInMethod);
  }
}

export class InvalidObjectTypeException extends ApolloError {
  constructor(objectType: string) {
    super(buildTypeErrorMessage(objectType, ErrorMessage.ObjectTypeError));
  }
}

export class EntryNotFoundException extends ApolloError {
  constructor() {
    super(ErrorMessage.EntityNotFoundError);
  }
}

export class FieldNotDefinedError extends UserInputError {
  constructor(fieldName: string) {
    super(
      buildOperationErrorMessage(
        fieldName,
        ErrorMessage.FieldNotFoundErrorMessage,
      ),
    );
  }
}

export class GqlOperationNotDefinedError extends UserInputError {
  constructor(operationName: string) {
    super(
      buildOperationErrorMessage(
        operationName,
        ErrorMessage.GqlOperationNotFoundErrorMessage,
      ),
    );
  }
}

export class InvalidFieldValueException extends UserInputError {
  constructor(fieldName: string) {
    super(
      buildTypeErrorMessage(
        fieldName,
        ErrorMessage.InvalidFieldValueErrorMessage,
      ),
    );
  }
}

export class InvalidSlugConfigException extends Error {
  constructor() {
    super(ErrorMessage.InvalidSlugConfigErrorMessage);
  }
}

export class MalformedRefreshTokenException extends Error {
  constructor() {
    super(ErrorMessage.MalformedRefreshToken);
  }
}

export class RevokedRefreshTokenException extends Error {
  constructor() {
    super(ErrorMessage.RevokedRefreshToken);
  }
}

export class ExpiredRefreshTokenException extends Error {
  constructor() {
    super(ErrorMessage.ExpiredRefreshToken);
  }
}

export class DuplicateValueInArrayException extends UserInputError {
  constructor(fieldName: string) {
    super(
      buildOperationErrorMessage(
        fieldName,
        ErrorMessage.DuplicateValueInArrayErrorMessage,
      ),
    );
  }
}

export class InvalidTemplateInputError extends UserInputError {
  constructor(fieldName: string) {
    super(`Invalid Template Input: ${fieldName} array cannot be empty `);
  }
}

export class InvalidStepsInputError extends Error {
  constructor() {
    super(
      `The provided steps object does not match the linked inspection's template`,
    );
  }
}

export class InspectionValidationError extends Error {
  constructor() {
    super(ErrorMessage.InspectionValidationErrorMessage);
  }
}

export class InvalidUrlError extends Error {
  constructor() {
    super(ErrorMessage.InvalidUrlErrorMessage);
  }
}
