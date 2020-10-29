//FOR USER 

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        auth: {
            username: { type: String, required: true },
            password: { type: String, required: true },
        },
        profile: {
            name: { type: String, default: function(){
                if(!this.auth.username) return null;
                return this.auth.username;
            }},
            email: { type: String, required: true },
            phone: { type: String },
            avatar: { type: String, default: '/user.png' },
            create: { type: Date, default: Date.now }
        },
        role: { type: String, default: 'GUEST' },
        verification: { type: Boolean, default: false },
        block: { type: Boolean, default: false },
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

UserSchema.index({ 'auth.username': 'text' });

const User = mongoose.model('User', UserSchema);

export default User;
