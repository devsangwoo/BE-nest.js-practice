import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../error-message-builder';

export const _validateTelephoneNumber = (value: string): boolean => {
  if (value === null) return true;

  if (!value) return false;

  return validator.isMobilePhone(value);
};

export const validateTelephoneNumber: IDatabaseValidator = {
  validator: _validateTelephoneNumber,
  message: errorMessageBuilder,
};
