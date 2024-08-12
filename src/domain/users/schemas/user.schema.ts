import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/core/enums/role.enum';

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    select: false,
  })
  confirmPassword: string;

  @Prop({
    required: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
