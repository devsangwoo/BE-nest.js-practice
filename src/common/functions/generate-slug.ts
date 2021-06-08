import slugify from 'slugify';
import { randomBytes } from 'crypto';
import { InvalidFunctionInputError } from '../errors/errors';

/**
 * A utility function that generates a slug
 *
 * @param {string[]} data <- an array of strings from which the slug will be generated
 *
 * @param {boolean} isUnique <- if not provided defaults to false
 *
 * @returns {string} slug <- the slug in lower case
 */
export const generateSlug = (data: string[], isUnique = false) => {
  if (data.length === 0) {
    throw new InvalidFunctionInputError();
  }

  if (isUnique) {
    const randomString = randomBytes(5).toString('hex');
    data.push(randomString);
  }

  const toSlug = data.join(' ');

  return slugify(toSlug, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
  });
};
