//FOR LAPTOP

import { toConvert } from '../../../plugins/string';
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CompanySchema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
        link: { type: String, default: function(){
            if(this.name) return toConvert(this.name, '-');
            return null;
        }},
    }, { 
        toJSON: { virtuals: true } 
    }
);

CompanySchema.virtual('trademarks', {
    ref: 'LaptopTrademark',
    localField: '_id',
    foreignField: 'company',
});

CompanySchema.virtual('trademarkCount', {
    ref: 'LaptopTrademark',
    localField: '_id',
    foreignField: 'company',
    count: true
});

CompanySchema.virtual('products', {
    ref: 'LaptopProduct',
    localField: '_id',
    foreignField: 'company',
});

CompanySchema.virtual('productCount', {
    ref: 'LaptopProduct',
    localField: '_id',
    foreignField: 'company',
    count: true
});

const Company = mongoose.model('LaptopCompany', CompanySchema)

export default Company;
