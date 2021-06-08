import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../common/error-message-builder';

export const _validateLongitude = (value: number): boolean => {
  if (!value) {
    return false;
  }
  return value >= -180 && value <= 180;
};

export const validateLongitude: IDatabaseValidator = {
  validator: _validateLongitude,
  message: errorMessageBuilder,
};
