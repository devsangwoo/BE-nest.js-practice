import { _validateZipCode } from '../zip-code.validator';

describe('ValidateZipCode', () => {
  it('should return false if given null', () => {
    const res = _validateZipCode(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateZipCode(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateZipCode('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid zipCode = "%s"',
    val => {
      const res = _validateZipCode(val);

      expect(res).toBe(false);
    },
  );

  it.each([['113', '11516']])(
    'should return true if given a valid zipCode = "%s"',
    val => {
      const res = _validateZipCode(val);

      expect(res).toBe(true);
    },
  );
});
