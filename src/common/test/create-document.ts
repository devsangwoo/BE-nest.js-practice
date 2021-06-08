import { validateAndGenerateSlug } from '../functions/validate-and-generate-slug';

export const createDocument = (
  entityModel,
  entityRepository,
  createEntityInput,
) => async () => {
  const slug = validateAndGenerateSlug(
    entityModel,
    entityRepository.slugConfig,
    createEntityInput,
  );

  const entity = new entityModel({
    ...createEntityInput,
    slug,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  });

  return await entity.save();
};
