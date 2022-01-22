import { _validateName } from '../name.validator';

describe('ValidateName', () => {
  it('should return false if given null', () => {
    const res = _validateName(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateName(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateName('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid name = "%s"',
    (val) => {
      const res = _validateName(val);

      expect(res).toBe(false);
    },
  );

  it.each([['gpl', 'gasolina']])(
    'should return true if given a valid name = "%s"',
    (val) => {
      const res = _validateName(val);

      expect(res).toBe(true);
    },
  );
});
