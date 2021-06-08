import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../common/error-message-builder';

export const _validateZipCode = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return value.length >= 3 && value.length <= 14;
};

export const validateZipCode: IDatabaseValidator = {
  validator: _validateZipCode,
  message: errorMessageBuilder,
};
