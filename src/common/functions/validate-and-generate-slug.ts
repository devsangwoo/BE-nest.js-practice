import { Model } from "mongoose";
import { slugConfigType } from "../data/types/slugConfig.type";
import { InvalidSlugConfigException } from "../errors/errors";
import { generateSlug } from "./generate-slug";


export const validateAndGenerateSlug = (entityModel: Model<any>, slugConfig: slugConfigType, input: any) => {
    if (input.slug) return input.slug;

    const entityProperties = Object.keys(entityModel.schema.paths);
    let slug = undefined;

    if (entityModel.schema.paths.slug) {
        if (!slugConfig.keys.every(key => entityProperties.includes(key))) {
            throw new InvalidSlugConfigException();
        }
        const slugValues = slugConfig.keys.map(key => input[key]);
        slug = generateSlug(slugValues, slugConfig.isUnique);
    }

    return slug;
};
