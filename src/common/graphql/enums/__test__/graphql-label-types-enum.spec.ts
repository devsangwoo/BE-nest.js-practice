import { GraphQlFieldNames } from '../graphql-label-types.enum';

describe('Graphql Labels enum', () => {
  it('should match the enum values with the given strings', () => {
    expect(GraphQlFieldNames.ID_FIELD).toEqual('id');
    expect(GraphQlFieldNames.INPUT_FIELD).toEqual('input');
    expect(GraphQlFieldNames.EMAIL_FIELD).toEqual('email');
  });
});
