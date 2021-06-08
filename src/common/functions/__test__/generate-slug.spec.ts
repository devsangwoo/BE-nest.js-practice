import { InvalidFunctionInputError } from '../../errors/errors';
import { generateSlug } from '../generate-slug';

describe('Slug generation', () => {
  it('throws an error if the given array is empty', () => {
    const data: string[] = [];

    expect(() => generateSlug(data)).toThrowError(InvalidFunctionInputError);
  });

  it('generates a slug given an array of strings', () => {
    const data: string[] = ['Toyota', 'Corolla', '2020'];
    const expectedResult = 'toyota-corolla-2020';

    const slug = generateSlug(data);

    expect(slug).toEqual(expectedResult);
  });

  it('creates the same slug given the same array and the isUnique flag set to false', () => {
    const data: string[] = ['Toyota', 'Corolla'];

    const slug1 = generateSlug(data);
    const slug2 = generateSlug(data);

    expect(slug1).toEqual(slug2);
  });

  it('creates two different slugs given the same array and the isUnique flag set to true', () => {
    const data: string[] = ['Toyota', 'Corolla'];

    const slug1 = generateSlug(data);
    const slug2 = generateSlug(data, true);

    expect(slug1).not.toEqual(slug2);
  });
});
