import { ICountry } from '../interfaces/entities/country-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { validateName } from 'src/common/validations/common/name/name.validator';
import { validateSlug } from 'src/common/validations/common/slug/slug.validator';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';

@Schema()
export class Country extends Document implements ICountry, IBaseEntity {
  @Prop()
  id: string;

  @Prop({
    required: true,
    validate: validateName,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: validateSlug,
  })
  slug: string;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.plugin(MongooseAutoPopulate);

CountrySchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
