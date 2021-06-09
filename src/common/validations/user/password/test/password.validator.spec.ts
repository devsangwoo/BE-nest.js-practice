import { _validatePassword } from '../password.validator';

describe('ValidatePassword', () => {
  it('should return false if given null', () => {
    const res = _validatePassword(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validatePassword(undefined);

    expect(res).toBe(false);
  });

  it('should return false if given an empty string', () => {
    const res = _validatePassword('');

    expect(res).toBe(false);
  });

  it.each([
    ['a'],
    [
      'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm$2a$12$VD6jnVWKAKo6volMxPUg8eZCsSu/PAACkwroI22knS5Jcj.c59qUe',
    ],
  ])('should return false if given an invalid password = "%s"', val => {
    const res = _validatePassword(val);

    expect(res).toBe(false);
  });

  it.each([
    ['mytestpassword'],
    ['123456'],
  ])('should return true if given a valid password = "%s"', val => {
    const res = _validatePassword(val);

    expect(res).toBe(true);
  });
});
