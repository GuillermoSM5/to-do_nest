import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, now } from 'mongoose';

@Schema()
export class Notes {
  @Prop({ required: true, lowercase: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  active: boolean;

  @Prop({ default: false })
  favorite: boolean;

  @Prop({ required: true })
  idUser: Types.ObjectId;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  editedAt: Date;
}

export const NotesSchema = SchemaFactory.createForClass(Notes);
