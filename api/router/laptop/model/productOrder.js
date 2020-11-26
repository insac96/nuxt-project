//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductOrderSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        variant: { type: Schema.Types.ObjectId, ref: 'LaptopVariant', required: true },
        warehouse: { type: Schema.Types.ObjectId, ref: 'LaptopWarehouse', required: true },
        warehouseColor: { type: Schema.Types.ObjectId, ref: 'LaptopWarehouseColor', required: true },

        order: { type: Schema.Types.ObjectId, ref: 'LaptopOrder', required: true },
        
        whenOrder: {
            amount: { type: Number , required: true },
            price: { type: Number , required: true },
            upprice: { type: Number , required: true },
            discount: { type: Number , required: true },
        }
    }, 
    {
        toJSON: { virtuals: true } 
    }
);

const ProductOrder = mongoose.model('LaptopProductOrder', OrderProductSchema);

export default ProductOrder;