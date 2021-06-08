import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../../common/error-message-builder';

export const _validateEmail = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isEmail(value);
};

export const validateEmail: IDatabaseValidator = {
  validator: _validateEmail,
  message: errorMessageBuilder,
};
