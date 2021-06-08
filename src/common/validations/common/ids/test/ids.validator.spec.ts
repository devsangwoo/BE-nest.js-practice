import { _validateIds } from '../ids.validator';

describe('ValidateID', () => {
  it('should return false if given null', () => {
    const res = _validateIds(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateIds(undefined);

    expect(res).toBe(false);
  });

  it('should return true if given an empty [string]', () => {
    const test = [];
    const res = _validateIds(test);

    expect(res).toBe(true);
  });

  it.each([[['a']], [['qwertyuiopasdfghjklzxcvbnm']]])(
    'should return false if given an invalid ID = "%s"',
    val => {
      const res = _validateIds(val);

      expect(res).toBe(false);
    },
  );

  it.each([[['5fcfa592ff275a0024e49f6c', '60218abd6e6f89002b8bfbaa']]])(
    'should return true if given a valid Id = "%s"',
    val => {
      const res = _validateIds(val);

      expect(res).toBe(true);
    },
  );
});
