import { AbstractDocument } from 'src/database/abstract.schema';
import * as mongoose from 'mongoose';
export declare class Order extends AbstractDocument {
    order_id: number;
    user_id: string;
    address_id: number;
    store_id: number;
    voucher_id?: number;
    method_id?: number;
    message?: string;
    total_discount?: number;
    total_price: number;
    status?: string;
    service_fee?: number;
    shipping_price?: number;
    is_removed: boolean;
    created_at: Date;
    updated_at: Date;
    order_foods?: string[];
    payments?: string[];
    order_food_options?: string[];
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
