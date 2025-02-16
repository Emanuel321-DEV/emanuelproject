import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true }) 
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  source: string;

  @Prop({ required: true })
  description: string; 

  @Prop({ required: true }) 
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
