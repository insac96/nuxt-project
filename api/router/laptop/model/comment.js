//FOR LAPTOP

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        content: { type: String, required: true },
        reply: [
            {
                user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
                content: { type: String, required: true },
                create: { type: Date, required: true }
            }
        ],
        create: { type: Date, default: Date.now }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const Comment = mongoose.model('LaptopComment', CommentSchema);

export default Comment;
