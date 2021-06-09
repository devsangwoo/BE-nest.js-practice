import { isValidObjectId } from 'mongoose';
import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../common/error-message-builder';

export const _validateId = (value: string): boolean => {
  if (!value) {
    return true;
  }
  return isValidObjectId(value);
};

export const validateUser: IDatabaseValidator = {
  validator: _validateId,
  message: errorMessageBuilder,
};
