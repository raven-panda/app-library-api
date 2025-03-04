import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Book {
  id: string;
  @Prop(String)
  title: string;
}

export const BookSchema = new mongoose.Schema({
  title: String,
});
