//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VariantColorSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        variant: { type: Schema.Types.ObjectId, ref: 'LaptopVariant', required: true },
        
        ////
        name: { type: String, required: true },
        code: { type: String, required: true },
        image: { type: String }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const VariantColor = mongoose.model('LaptopVariantColor', VariantColorSchema);

export default VariantColor;
