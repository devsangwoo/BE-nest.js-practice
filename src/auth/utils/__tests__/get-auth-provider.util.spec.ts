import { InvalidFunctionInputError } from '@common/common/errors/errors';
import { AuthProviders } from '../auth-providers.enum';
import { getAuthProvider } from '../get-auth-provider.util';

describe('getSocialAuthProvider', () => {
  it('throws an error if the provided value does not match any authProvider', () => {
    const testValue = '4chan.com';

    expect(() => getAuthProvider(testValue)).toThrow(
      new InvalidFunctionInputError(),
    );
  });

  it('returns the value that matches with the given social provider', () => {
    const google = 'google.com';
    const facebook = 'facebook.com';
    const local = 'password';

    expect(getAuthProvider(google)).toEqual(AuthProviders.Google);
    expect(getAuthProvider(facebook)).toEqual(AuthProviders.Facebook);
    expect(getAuthProvider(local)).toEqual(AuthProviders.Local);
  });
});
