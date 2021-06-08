import { ICountry } from '../interfaces/entities/country-entity.interface';
import { IBaseEntity } from '@common/common/data/interfaces/base-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as MongooseAutoPopulate from 'mongoose-autopopulate';
import { populateMaxDepth } from '@common/common/mongo/config/auto-populate.config';
import { validateSlug } from '@common/common/validations/common/slug/slug.validator';
import { validateName } from '@common/common/validations/common/name/name.validator';
import { validateIds } from '@common/common/validations/common/ids/ids.validator';
import { State } from '../../state/database/state.entity';

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

  @Prop({
    default: [],
    type: [MongooseSchema.Types.ObjectId],
    ref: 'State',
    validate: validateIds,
    autopopulate: { maxDepth: populateMaxDepth },
  })
  states: State[];

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const CountrySchema = SchemaFactory.createForClass(Country);

CountrySchema.plugin(MongooseAutoPopulate);

CountrySchema.pre('save', function(next) {
  this.id = this._id;

  next();
});
