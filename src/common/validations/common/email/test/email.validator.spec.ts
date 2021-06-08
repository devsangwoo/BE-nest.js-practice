import { _validateEmail } from '../email.validator';

describe('ValidateEmail', () => {
  it('should return false given null', () => {
    const res = _validateEmail(null);

    expect(res).toEqual(false);
  });

  it('should return false given undefined', () => {
    const res = _validateEmail(undefined);

    expect(res).toEqual(false);
  });

  it('should return false given an empty string', () => {
    const res = _validateEmail('');

    expect(res).toEqual(false);
  });

  it.each([['comida.com'], ['www.tusurupu.com'], ['test@cuco']])(
    'should return false given an invalid email = "%s"',
    val => {
      const res = _validateEmail(val);

      expect(res).toEqual(false);
    },
  );

  it.each([['test@gmail.com'], ['comida@yahoo.com']])(
    'should return true given a valid email = "%s"',
    val => {
      const res = _validateEmail(val);
      expect(res).toEqual(true);
    },
  );
});
