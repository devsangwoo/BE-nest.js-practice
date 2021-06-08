import { DocumentQuery, Document } from 'mongoose';

export function paginationBuilder(
  queryBuilder: DocumentQuery<Document[], Document>,
  start: number,
  limit: number,
) {
  if (start) {
    queryBuilder.skip(start);
  }

  if (limit) {
    queryBuilder.limit(limit);
  }

  return queryBuilder;
}
