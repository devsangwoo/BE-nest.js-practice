import { IDatabaseValidator } from 'src/common/data/interfaces/database-validator.interface';
import { invalidPasswordMessage } from './message/invalid-password-message';

export const _validatePassword = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return value.length >= 6 && value.length <= 40;
};

export const validatePassword: IDatabaseValidator = {
  validator: _validatePassword,
  message: invalidPasswordMessage,
};
