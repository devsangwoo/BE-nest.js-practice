import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../error-message-builder';

export const _validateAddress = (value: string): boolean => {
  if (value === null) return true;

  if (!value) return false;

  return value.length >= 7 && value.length <= 300;
};

export const validateAddress: IDatabaseValidator = {
  validator: _validateAddress,
  message: errorMessageBuilder,
};
