import { _validateLatitude } from '../latitude.validator';

describe('ValidateLatitude', () => {
  it('should return false if given null', () => {
    const res = _validateLatitude(null);

    expect(res).toBe(false);
  });

  it('should return false if given undefined', () => {
    const res = _validateLatitude(undefined);

    expect(res).toBe(false);
  });

  it.each([[-91], [90.4]])(
    'should return false if given an invalid latitude = "%s"',
    (val) => {
      const res = _validateLatitude(val);

      expect(res).toBe(false);
    },
  );

  it.each([[-90, 89.934354464574]])(
    'should return true if given a valid latitude = "%s"',
    (val) => {
      const res = _validateLatitude(val);

      expect(res).toBe(true);
    },
  );
});
