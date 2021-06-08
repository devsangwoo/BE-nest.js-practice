import { _validateMongoIdNullable } from '../mongoose-id-nullable.validator';

describe('ValidateMongoIdNullable', () => {
  it('should return false if given undefined', () => {
    const res = _validateMongoIdNullable(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateMongoIdNullable('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['145465765765a'], ['1234-4354-3-543-43-53']])(
    'should return false if given an invalid Id = "%s"',
    (value: string) => {
      const res = _validateMongoIdNullable(value);

      expect(res).toBe(false);
    },
  );

  it('should return true if given null', () => {
    const res = _validateMongoIdNullable(null);

    expect(res).toBe(true);
  });

  it.each([['5fcfa592ff275a0024e49f6c'], ['60218abd6e6f89002b8bfbaa']])(
    'should return true if given a valid Id = "%s"',
    (value: string) => {
      const res = _validateMongoIdNullable(value);

      expect(res).toBe(true);
    },
  );
});
