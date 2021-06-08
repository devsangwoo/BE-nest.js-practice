import { EntityRepositoryType } from 'src/common/test/types/entity-repository.type';

export const entityRepository: EntityRepositoryType = {
  getEntityById: jest.fn(),
  getAllEntities: jest.fn(),
  createEntity: jest.fn(),
  updateEntity: jest.fn(),
  deleteEntity: jest.fn(),
};
