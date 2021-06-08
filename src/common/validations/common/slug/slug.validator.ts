import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import validator from 'validator';
import { errorMessageBuilder } from '../error-message-builder';

export const _validateSlug = (value: string): boolean => {
  if (!value) {
    return false;
  }

  return validator.isSlug(value);
};

export const validateSlug: IDatabaseValidator = {
  validator: _validateSlug,
  message: errorMessageBuilder,
};
