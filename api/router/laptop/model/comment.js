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
        create: { type: Date, default: Date.now },
        showInputReply: { type: Boolean, default: false }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

CommentSchema.virtual('reply', {
    ref: 'LaptopCommentReply',
    localField: '_id',
    foreignField: 'comment',
});

const Comment = mongoose.model('LaptopComment', CommentSchema);

export default Comment;
