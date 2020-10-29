//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VariantSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        code: { type: String, required: true },
        screen: { type: String, required: true },
        cpu: { type: String, required: true },
        ram: { type: String, required: true },
        gpu: { type: String, required: true },
        harddrive: { type: String, required: true },
        price: { type: Number, default: 0 },
        status: { type: String, required: true },
        visibility: { type: Boolean, default: true },
        discount: {
            type: { type: Boolean, default: false },
            amount: { type: Number, default: 0 }
        }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

VariantSchema.virtual('colors', {
    ref: 'LaptopColor',
    localField: '_id',
    foreignField: 'variant',
});

VariantSchema.index({ status: 'text' });

const Variant = mongoose.model('LaptopVariant', VariantSchema);

export default Variant;
