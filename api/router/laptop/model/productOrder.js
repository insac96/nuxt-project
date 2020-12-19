//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema(
    {
        warehouse: { type: Schema.Types.ObjectId, ref: 'LaptopWarehouse', required: true },
        warehouseColor: { type: Schema.Types.ObjectId, ref: 'LaptopWarehouseColor', required: true },
        order: { type: Schema.Types.ObjectId, ref: 'LaptopOrder', required: true },
        
        sold: {
            type: { type: Boolean, default: false, required: true }
        },
        
        whenOrder: {
            amount: { type: Number , required: true },
            price: { type: Number , required: true },
            upprice: { type: Number , required: true },
            discountAmount: { type: Number , required: true },
        }
    }, 
    {
        toJSON: { virtuals: true } 
    }
);

ProductOrderSchema.virtual('statistical.price.revenue').get(function() {
    return (this.whenOrder.price + this.whenOrder.upprice - this.whenOrder.discountAmount) * this.whenOrder.amount;
});

ProductOrderSchema.virtual('statistical.price.real').get(function() {
    if(!this.warehouse.import || !this.warehouseColor.export) return null;
    return (this.warehouse.import.price + this.warehouseColor.export.upprice) * this.whenOrder.amount;
});

ProductOrderSchema.virtual('statistical.price.income').get(function() {
    if(!this.statistical.price.real) return null;
    return (this.statistical.price.revenue - this.statistical.price.real);
});

const ProductOrder = mongoose.model('LaptopProductOrder', ProductOrderSchema);
export default ProductOrder;