//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TrademarkSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        name: { type: String, required: true },
    }, { 
        toJSON: { virtuals: true } 
    }
);

const Trademark = mongoose.model('LaptopTrademark', TrademarkSchema);

export default Trademark;
