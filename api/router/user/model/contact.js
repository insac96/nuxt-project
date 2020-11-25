//FOR USER 

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        phone: { type: String , required: true },
        address: { type: String , required: true },
        isDefault: { type: Boolean, default: false }
    }, 
 
    { 
        toJSON: { virtuals: true } 
    }
);

const Contact = mongoose.model('UserContact', ContactSchema);

export default Contact;
