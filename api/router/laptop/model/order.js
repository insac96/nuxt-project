//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
    {
        vendor: { type: Schema.Types.ObjectId, ref: 'UserContact', required: true },
        type: { type: Number, required: true },
        pay: { type: Number, required: true },
        create: { type: Date, default: Date.now },
        verification: {
            type: { type: false, default: false },
            date: { type: Date },
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
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