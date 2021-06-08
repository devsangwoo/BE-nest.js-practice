export type EntityRepositoryType = {
  getEntityById: jest.Mock;
  getAllEntities: jest.Mock;
  createEntity: jest.Mock;
  updateEntity: jest.Mock;
  deleteEntity: jest.Mock;
};
