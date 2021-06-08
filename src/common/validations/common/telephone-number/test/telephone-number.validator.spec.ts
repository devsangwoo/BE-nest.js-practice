import { _validateTelephoneNumber } from '../telephone-number.validator';

describe('ValidateTelephoneNumber', () => {
  it('should return true given null', () => {
    const res = _validateTelephoneNumber(null);

    expect(res).toEqual(true);
  });

  it('should return false given undefined', () => {
    const res = _validateTelephoneNumber(undefined);

    expect(res).toEqual(false);
  });

  it('should return false given an empty string', () => {
    const res = _validateTelephoneNumber('');

    expect(res).toEqual(false);
  });

  it.each([['comida.com'], ['www.tusurupu.com'], ['test@cuco']])(
    'should return false given an invalid telephoneNumber = "%s"',
    val => {
      const res = _validateTelephoneNumber(val);

      expect(res).toEqual(false);
    },
  );

  it.each([['8094834501'], ['5223358764']])(
    'should return true given a valid telephoneNumber = "%s"',
    val => {
      const res = _validateTelephoneNumber(val);
      expect(res).toEqual(true);
    },
  );
});
