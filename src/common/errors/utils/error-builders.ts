import { ErrorMessage } from '../enums/error-message-types.enum';

export const buildOperationErrorMessage = (
  fieldName: string,
  errorMessage: ErrorMessage,
): string => {
  return `${fieldName} ${errorMessage}`;
};

export const buildTypeErrorMessage = (
  objectType: string,
  errorMessage: ErrorMessage,
) => {
  return `${errorMessage} ${objectType}`;
};
