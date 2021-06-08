import { DuplicateValueInArrayException } from '../errors/errors';

export const verifyDuplicateValuesInArray = data => {
  const fieldsToVerify = Object.keys(data);

  for (const field of fieldsToVerify) {
    if (data[field] instanceof Array) {
      const values = new Set(data[field]);
      if (data[field].length != values.size) {
        throw new DuplicateValueInArrayException(field);
      }
    }
  }
};
