//FOR LAPTOP

import { toConvert } from '../../../plugins/string';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        name: { type: String, required: true },
        images: [
            { type: String }
        ],
        visibility: { type: Boolean, default: true },
        link: { type: String , required: true },
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

ProductSchema.virtual('configuration', {
    ref: 'LaptopConfiguration',
    localField: '_id',
    foreignField: 'product',
    justOne: true
});

ProductSchema.virtual('article', {
    ref: 'LaptopArticle',
    localField: '_id',
    foreignField: 'product',
    justOne: true
});

ProductSchema.virtual('variants', {
    ref: 'LaptopVariant',
    localField: '_id',
    foreignField: 'product',
});

ProductSchema.virtual('variantCount', {
    ref: 'LaptopVariant',
    localField: '_id',
    foreignField: 'product',
    count: true
});

ProductSchema.virtual('comments', {
    ref: 'LaptopComment',
    localField: '_id',
    foreignField: 'product',
});

ProductSchema.virtual('commentCount', {
    ref: 'LaptopComment',
    localField: '_id',
    foreignField: 'product',
    count: true
});

ProductSchema.index({ link: 'text' });

const Product = mongoose.model('LaptopProduct', ProductSchema);
export default Product;
