export interface IBaseGraphqlFilterInput {
  start?: number;
  limit?: number;
  sort?: Record<string, string>;
  where?: Record<string, any>;
}
