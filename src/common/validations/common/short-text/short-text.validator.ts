import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { errorMessageBuilder } from '../error-message-builder';

export const _validateShortText = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return value.length >= 2 && value.length <= 25;
};

export const validateShortText: IDatabaseValidator = {
  validator: _validateShortText,
  message: errorMessageBuilder,
};
