import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export type UsersDocument = HydratedDocument<Users>;

@Schema()
export class Users {
  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  username: string;

  @Prop({ required: true })
  @MinLength(8)
  password: string;

  @Prop({ required: true, unique: true })
  @IsEmail()
  email: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
