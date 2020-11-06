//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NewsSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String },
        content: { type: String },
        top: { type: Boolean, default: false },
        visibility: { type: Boolean, default: true },
        create: { type: Date, default: Date.now },
        link: { type: String , required: true },
        products: [ { type: Schema.Types.ObjectId, ref: 'LaptopProduct' } ],
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const News = mongoose.model('LaptopNews', NewsSchema);

export default News;
