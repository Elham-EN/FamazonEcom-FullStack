import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// This allows us to work with the Product schema and MongoDB
// document properties and methods in a typed manner.
export type ProductDocument = Product & Document;

// This decorator is used to indicate that the following class
// should be treated as a Mongoose schema.
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  description: string;
}

// create a Mongoose schema based on the Product class.
export const ProductSchema = SchemaFactory.createForClass(Product);
