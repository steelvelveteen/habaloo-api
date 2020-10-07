import mongoose, { Schema, Document } from 'mongoose';

interface AccountDoc extends Document {
    email: string,
    username: string,
    firstname: string,
    lastname: string,
    country: string
};

const AccountSchema: Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true
    },
    country: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
});

export default mongoose.model<AccountDoc>('UserAccount', AccountSchema);
