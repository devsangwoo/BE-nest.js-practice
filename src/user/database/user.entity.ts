import { Document } from 'mongoose';
import { IUser } from '../interfaces/user-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';
import { validateName } from 'src/common/validations/common/name/name.validator';
import { validateTelephoneNumber } from 'src/common/validations/common/telephone-number/telephone-number.validator';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { validateEmail } from 'src/common/validations/user/email/email.validator';

@Schema()
export class User extends Document implements IBaseEntity, IUser {
  @Prop()
  id: string;

  @Prop({ required: true, validate: validateName })
  name: string;

  @Prop({ required: true, validate: validateName })
  lastName: string;

  @Prop({
    required: true,
    unique: true,
    validate: validateEmail,
    lowercase: true,
  })
  email: string;

  @Prop({ default: null, validate: validateTelephoneNumber })
  telephoneNumber: string;

  @Prop({
    required: true,
    default: UserRoles.CLIENT,
    enum: Object.values(UserRoles),
  })
  role: UserRoles;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  updatedAt: string;

  @Prop({ required: true })
  createdAt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', function (next) {
  this.id = this._id;

  next();
});
