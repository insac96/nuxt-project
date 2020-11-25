//FOR USER 

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const DeliverySchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        vendor: { type: Schema.Types.ObjectId, ref: 'UserContact', required: true },
        create: { type: Date, default: Date.now },
        verification: { type: Boolean, default: false },
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const Delivery = mongoose.model('LaptopDelivery', DeliverySchema);

export default Delivery;
