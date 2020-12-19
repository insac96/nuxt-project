//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WarehouseSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        variant: { type: Schema.Types.ObjectId, ref: 'LaptopVariant', required: true },

        visibility: { type: Boolean, default: false, required: true },
        
        ///Import
        import: {
            amount: { type: Number },
            price: { type: Number, required: true },
            date: { type: Date, default: Date.now },
        },

        //Export
        export :{
            amount: { type: Number, default: 0, required: true },
            price: { type: Number, required: true },
        }
    }, 
    { 
        toJSON: { virtuals: true }
    }
);

WarehouseSchema.virtual('colors', {
    ref: 'LaptopWarehouseColor',
    localField: '_id',
    foreignField: 'warehouse',
});

WarehouseSchema.virtual('statistical.price.funds').get(function() {
    return (this.import.amount + this.export.amount) * this.import.price;
});

WarehouseSchema.virtual('statistical.product.stock').get(function() {
    return this.import.amount;
});
WarehouseSchema.virtual('statistical.product.sold').get(function() {
    return this.export.amount;
});

const Warehouse = mongoose.model('LaptopWarehouse', WarehouseSchema);

export default Warehouse;