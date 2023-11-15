import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, lowercase: true, unique: true })
  email: string;

  @Prop({ type: [String], default: ['user'] })
  role: string[];

  @Prop()
  phrase: string;
}

export const UseSchema = SchemaFactory.createForClass(User);
