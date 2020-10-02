import mongoose, { Schema, Document } from 'mongoose';

interface UserDoc extends Document {
    email: string,
    password: string
}

const UserSchema: Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

export default mongoose.model<UserDoc>('User', UserSchema);