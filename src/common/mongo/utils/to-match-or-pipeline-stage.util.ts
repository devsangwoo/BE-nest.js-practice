import * as mongoose from 'mongoose';

export const toMatchOrPipelineStage = (fieldName: string, ids: string[]) => {
  const cat = ids.map((category: string) => {
    const obj = {};
    obj[fieldName] = new mongoose.Types.ObjectId(category);
    return obj;
  });

  const pipelineStage = {
    $match: {
      $or: cat,
    },
  };

  return pipelineStage;
};
