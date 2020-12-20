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
        },

        //OrderWait
        orderWait: {
            amount:  { type: Number, required: true, default: 0}
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
    if(!this.import || !this.export || !this.orderWait) return null;

    return (this.import.amount + this.export.amount + this.orderWait.amount) * this.import.price;
});

WarehouseSchema.virtual('statistical.product.stock').get(function() {
    if(!this.import) return null;

    return this.import.amount;
});
WarehouseSchema.virtual('statistical.product.sold').get(function() {
    if(!this.export) return null;

    return this.export.amount;
});
WarehouseSchema.virtual('statistical.product.orderWait').get(function() {
    if(!this.orderWait) return null;

    return this.orderWait.amount;
});

const Warehouse = mongoose.model('LaptopWarehouse', WarehouseSchema);

export default Warehouse;