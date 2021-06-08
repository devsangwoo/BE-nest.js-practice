import { _validateShortText } from '../short-text.validator';

describe('ValidateShortText', () => {
  it('should return false if given null', () => {
    const res = _validateShortText(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateShortText(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateShortText('');

    expect(res).toBe(false);
  });

  it.each([['a'], ['qwertyuiopasdfghjklzxcvbnm']])(
    'should return false if given an invalid name = "%s"',
    val => {
      const res = _validateShortText(val);

      expect(res).toBe(false);
    },
  );

  it.each([['gpl', 'gasolina']])(
    'should return true if given a valid name = "%s"',
    val => {
      const res = _validateShortText(val);

      expect(res).toBe(true);
    },
  );
});
