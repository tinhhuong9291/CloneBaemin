import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
  collection: 'foods',
  timestamps: true,
})
export class Food extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, unique: true })
  slug: string;

  @Prop({ required: true })
  price: number;

  @Prop({ type: String })
  description?: string;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: Number, default: 0 })
  stockQuantity: number;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  storeId: Types.ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(Food);

FoodSchema.index({ name: 'text', tags: 'text' });
