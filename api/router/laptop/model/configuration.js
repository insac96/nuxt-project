//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ConfigurationSchema = new Schema(
    {
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        default: {
            screen: [{ type: String }],
            cpu: { type: String },
            ram: { type: String },
            harddrive: [{ type: String }],
            ledkeyboard: { type: String },
            webcam: { type: String },
            audio: { type: String },
            wifi: { type: String },
            windows: { type: String },
            weight: { type: String },
            size: { type: String },
            pin: { type: String },
            security: { type: String },
            connect: { type: String },
            bluetooth: { type: String },
            origin: { type: String },
            guarantee: { type: String },
            typeproduct: { type: String }
        },
        upgrade: {
            cpu: { type: Boolean, default: false },
            ram: { 
                type: { type: Boolean, default: false },
                max: { type: Number },
                slot: { type: Number }
            },
            gpu: { type: Boolean, default: false },
            harddrive: { 
                type: { type: Boolean, default: false },
                max: { type: String },
                slot: { type: String }
            },
            wifi: { type: Boolean, default: false },
        },
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const Configuration = mongoose.model('LaptopConfiguration', ConfigurationSchema);

export default Configuration;
