import { _validateId } from '../user.validator';

describe('ValidateID', () => {
  it('should return true if given null', () => {
    const res = _validateId(null);

    expect(res).toBe(true);
  });

  it('should return true if given undefined', () => {
    const res = _validateId(undefined);

    expect(res).toBe(true);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid ID = "%s"',
    val => {
      const res = _validateId(val);

      expect(res).toBe(false);
    },
  );

  it.each([['5fcfa592ff275a0024e49f6c'], ['60218abd6e6f89002b8bfbaa']])(
    'should return true if given a valid Id = "%s"',
    val => {
      const res = _validateId(val);

      expect(res).toBe(true);
    },
  );
});
