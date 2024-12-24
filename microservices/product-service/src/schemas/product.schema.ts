// Product Schema (product.schema.ts)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ 
  collection: 'foods', 
  timestamps: true 
})
export class FoodDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String })
  slug?: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: String })
  description?: string;

  @Prop({ default: true })
  isAvailable?: boolean;

  @Prop({ type: Number, default: 0 })
  stockQuantity: number;

  @Prop({ type: [String] })
  tags?: string[];

  @Prop({ type: Number, default: 0 })
  rating?: number;

  @Prop({ type: [String] })
  images?: string[];

  @Prop({ type: Object })
  options?: {
    name: string;
    choices: {
      name: string;
      price?: number;
    }[];
  }[];

  @Prop({ type: Number, default: 0 })
  totalReviews?: number;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  storeId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Promotion' })
  promotionId?: Types.ObjectId;
}

export const FoodSchema = SchemaFactory.createForClass(FoodDocument);

// Indexing for performance
FoodSchema.index({ name: 'text', tags: 1 });
FoodSchema.index({ price: 1, isAvailable: 1 });
FoodSchema.index({ storeId: 1 });

// Order Schema (order.schema.ts)
@Schema({ 
  collection: 'orders', 
  timestamps: true 
})
export class OrderDocument extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store', required: true })
  storeId: Types.ObjectId;

  @Prop({ 
    type: String, 
    enum: [
      'PENDING', 
      'CONFIRMED', 
      'PREPARING', 
      'OUT_FOR_DELIVERY', 
      'DELIVERED', 
      'CANCELLED'
    ], 
    default: 'PENDING' 
  })
  status: string;

  @Prop({ type: [
    {
      foodId: { type: Types.ObjectId, ref: 'Food' },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      options: [{
        name: String,
        choices: [{
          name: String,
          price: Number
        }]
      }]
    }
  ]})
  items: {
    foodId: Types.ObjectId;
    quantity: number;
    price: number;
    options?: {
      name: string;
      choices: {
        name: string;
        price?: number;
      }[];
    }[];
  }[];

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Number, default: 0 })
  discountAmount?: number;

  @Prop({ type: Types.ObjectId, ref: 'Voucher' })
  voucherId?: Types.ObjectId;

  @Prop({ 
    type: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      postalCode: String,
      latitude: Number,
      longitude: Number
    }
  })
  deliveryAddress: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };

  @Prop({ 
    type: {
      methodName: String,
      price: Number
    }
  })
  shippingMethod: {
    methodName: string;
    price: number;
  };

  @Prop({ 
    type: {
      method: String,
      status: String,
      transactionId: String
    }
  })
  payment: {
    method: string;
    status: string;
    transactionId?: string;
  };

  @Prop({ type: String })
  customerNote?: string;

  @Prop({ type: Date })
  estimatedDeliveryTime?: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);

// Indexing for performance and query optimization
OrderSchema.index({ userId: 1, status: 1 });
OrderSchema.index({ storeId: 1, status: 1 });
OrderSchema.index({ createdAt: -1 });

// Additional schemas for supporting collections
@Schema({ 
  collection: 'stores', 
  timestamps: true 
})
export class StoreDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: [String] })
  images?: string[];

  @Prop({ type: String })
  phone: string;

  @Prop({ type: Number, default: 0 })
  rating?: number;
}

export const StoreSchema = SchemaFactory.createForClass(StoreDocument);

@Schema({ 
  collection: 'promotions', 
  timestamps: true 
})
export class PromotionDocument extends Document {
  @Prop({ required: true })
  description: string;

  @Prop({ type: Number, required: true })
  discountPercentage: number;

  @Prop({ type: Date })
  startDate?: Date;

  @Prop({ type: Date })
  endDate?: Date;
}

export const PromotionSchema = SchemaFactory.createForClass(PromotionDocument);