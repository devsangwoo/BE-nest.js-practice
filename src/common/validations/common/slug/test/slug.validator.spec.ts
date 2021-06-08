import { _validateSlug } from '../slug.validator';

describe('ValidateSlug', () => {
  it('should return false given null', () => {
    const res = _validateSlug(null);

    expect(res).toEqual(false);
  });

  it('should return false given undefined', () => {
    const res = _validateSlug(undefined);

    expect(res).toEqual(false);
  });

  it('should return false given an empty string', () => {
    const res = _validateSlug('');

    expect(res).toEqual(false);
  });

  it.each([
    ['An invalid Slug'],
    ['AN-Inval id Sl-gu'],
    ['Anoher . Invalid-Slug'],
  ])('should return false given an invalid slug = "%s"', val => {
    const res = _validateSlug(val);

    expect(res).toEqual(false);
  });

  it.each([['test-slug'], ['slug'], ['a-super-long-valid-slug']])(
    'should return true given a valid slug = "%s"',
    val => {
      const res = _validateSlug(val);

      expect(res).toEqual(true);
    },
  );
});
