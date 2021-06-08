import { errorMessageBuilder } from '../error-message-builder';
import { isValidObjectId } from 'mongoose';
import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';

export const _validateId = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return isValidObjectId(value);
};

export const validateId: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder,
};
