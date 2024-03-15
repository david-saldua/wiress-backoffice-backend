import { Schema, Document, model } from 'mongoose';
import { Users } from 'src/shared/interfaces/users.interface';
import * as bcrypt from 'bcrypt';

export interface UserDocument extends Users, Document {}

const UsersSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

UsersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const UserModel = model<UserDocument>('Users', UsersSchema);
