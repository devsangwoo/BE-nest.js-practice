import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../error-message-builder';
import { _validateId } from './id.validator';

export const _validateMongoIdNullable = (value: string): boolean => {
  if (value === null) {
    return true;
  }

  return _validateId(value);
};

export const validateMongoIdNullable: IDatabaseValidator = {
  validator: _validateMongoIdNullable,
  message: errorMessageBuilder,
};
