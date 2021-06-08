export const updateEntities: any = data => {
  const updateData = {};

  const fieldToUpdateList = Object.keys(data);

  for (const field of fieldToUpdateList) {
    if (data[field] !== undefined && data[field] !== null) {
      updateData[field] = data[field];
    }
  }

  updateData['updatedAt'] = new Date().toISOString();

  return updateData;
};
