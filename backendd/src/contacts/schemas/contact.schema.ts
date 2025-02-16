/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  origem: string;

  @Prop({ required: true })
  descricao: string;

  @Prop()
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
