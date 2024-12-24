import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/database/abstract.schema';
import * as mongoose from 'mongoose';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop({ required: true, unique: true })
  order_id: number;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  address_id: number;

  @Prop({ required: true })
  store_id: number;

  @Prop()
  voucher_id?: number;

  @Prop()
  method_id?: number;

  @Prop({ maxlength: 255 })
  message?: string;

  @Prop()
  total_discount?: number;

  @Prop({ required: true })
  total_price: number;

  @Prop({ maxlength: 50 })
  status?: string;

  @Prop()
  service_fee?: number;

  @Prop()
  shipping_price?: number;

  @Prop({ default: false })
  is_removed: boolean;

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;

  @Prop({ type: [String] })
  order_foods?: string[];

  @Prop({ type: [String] })
  payments?: string[];

  @Prop({ type: [String] })
  order_food_options?: string[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
