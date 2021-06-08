import { InvalidObjectTypeException } from '../errors/errors';

export const getEntityByIdLog = (entityName: string, data: any) => {
  checkObject(data);

  return `Get ${entityName} by id ${JSON.stringify(data)}`;
};

export const getEntitiesLog = (entityName: string, data: any) => {
  checkObject(data);

  return `Get ${entityName} with payload ${JSON.stringify(data)}`;
};

export const createEntityLog = (entityName: string, data: any) => {
  checkObject(data);

  return `Create ${entityName} with payload ${JSON.stringify(data)}`;
};

export const updateEntityLog = (entityName: string, data: any) => {
  checkObject(data);

  return `Update ${entityName} with payload ${JSON.stringify(data)}`;
};

export const deleteEntityLog = (entityName: string, data: any) => {
  checkObject(data);

  return `Delete ${entityName} by id ${JSON.stringify(data)}`;
};

const checkObject = (obj: any) => {
  const typeOfObj = typeof obj;
  const isObject = typeOfObj === 'object' && obj !== null;

  if (!isObject) {
    throw new InvalidObjectTypeException(typeOfObj);
  }
};
