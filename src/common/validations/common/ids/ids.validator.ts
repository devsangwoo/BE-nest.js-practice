import { errorMessageBuilder } from '../error-message-builder';
import { isValidObjectId } from 'mongoose';
import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';

export const _validateIds = (value: string[]): boolean => {
  if (!value) {
    return false;
  }

  if (value === []) {
    return true;
  }

  for (let i = 0; i < value.length; i++) {
    if (!isValidObjectId(value[i])) {
      return false;
    }
  }

  return true;
};

export const validateIds: IDatabaseValidator = {
  validator: _validateIds,
  message: errorMessageBuilder,
};
