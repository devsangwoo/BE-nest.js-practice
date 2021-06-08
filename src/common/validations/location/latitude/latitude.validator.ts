import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../../common/error-message-builder';

export const _validateLatitude = (value: number): boolean => {
  if (!value) {
    return false;
  }
  return value >= -90 && value <= 90;
};

export const validateLatitude: IDatabaseValidator = {
  validator: _validateLatitude,
  message: errorMessageBuilder,
};
