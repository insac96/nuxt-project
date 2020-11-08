//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const WarehouseColorSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        variant: { type: Schema.Types.ObjectId, ref: 'LaptopVariant', required: true },
        warehouse: { type: Schema.Types.ObjectId, ref: 'LaptopWarehouse', required: true },
        information: { type: Schema.Types.ObjectId, ref: 'LaptopVariantColor', required: true },

        ////
        import: {
            amount: { type: Number, required: true },
        },

        export: {
            upprice: { type: Number, required: true, default: 0 },
        }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const WarehouseColor = mongoose.model('LaptopWarehouseColor', WarehouseColorSchema);

export default WarehouseColor;
