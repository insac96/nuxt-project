//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
    {
        name: { type: String, required: true },
        logo: { type: String, required: true },
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
