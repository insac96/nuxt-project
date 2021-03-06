//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        vendor: { type: Schema.Types.ObjectId, ref: 'UserContact', required: true },
        type: { type: Number, required: true },
        pay: { type: Number, required: true },
        create: { type: Date, default: Date.now },
        note: { type: String, default: null },
        verification: {
            type: { type: Boolean, default: false, required: true },
            date: { type: Date },
            user: { type: Schema.Types.ObjectId, ref: 'User' },
            status: { type: String, default: null }
        },
        done: {
            type: { type: Boolean, default: false, required: true },
            date: { type: Date },
        }
    }, 
    {
        toJSON: { virtuals: true } 
    }
);

OrderSchema.virtual('products', {
    ref: 'LaptopProductOrder',
    localField: '_id',
    foreignField: 'order',
});

const Order = mongoose.model('LaptopOrder', OrderSchema);

export default Order;