import { _validateAddress } from '../address.validator';

describe('ValidateName', () => {
  it('should return true if given null', () => {
    const res = _validateAddress(null);

    expect(res).toBe(true);
  });

  it('should return false if given undefined', () => {
    const res = _validateAddress(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validateAddress('');

    expect(res).toBe(false);
  });

  it.each([
    ['afewf4'],
    [
      'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
    ],
  ])('should return false if given an invalid name = "%s"', (val) => {
    const res = _validateAddress(val);

    expect(res).toBe(false);
  });

  it.each([['Lucerna', 'Santo Domingo Este calle 12 E']])(
    'should return true if given a valid name = "%s"',
    (val) => {
      const res = _validateAddress(val);

      expect(res).toBe(true);
    },
  );
});
