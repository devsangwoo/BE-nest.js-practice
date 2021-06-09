import { Document } from 'mongoose';
import { IUser } from '../interfaces/user-entity.interface';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IBaseEntity } from 'src/common/data/interfaces/base-entity.interface';
import { UserRoles } from 'src/common/auth/enums/user-roles.enum';
import { validateEmail } from 'src/common/validations/user/email/email.validator';

@Schema()
export class User extends Document implements IBaseEntity, IUser {
  @Prop()
  id: string;

  @Prop({
    required: true,
    unique: true,
    validate: validateEmail,
    lowercase: true,
  })
  email: string;

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
