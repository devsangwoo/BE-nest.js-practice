import { _validateLongitude } from '../longitude.validator';

describe('ValidateLongitude', () => {
  it('should return false if given null', () => {
    const res = _validateLongitude(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateLongitude(undefined);

    expect(res).toBe(false);
  });

  it.each([[-181], [180.4]])(
    'should return false if given an invalid longitude = "%s"',
    (val) => {
      const res = _validateLongitude(val);

      expect(res).toBe(false);
    },
  );

  it.each([[-180, 179.3499454]])(
    'should return true if given a valid longitude = "%s"',
    (val) => {
      const res = _validateLongitude(val);

      expect(res).toBe(true);
    },
  );
});
