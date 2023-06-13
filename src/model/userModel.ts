import mongoose, { Schema, Document } from 'mongoose';
export interface UserDocument extends Document {
	userId: string; // Add the userId field
	username: string;
	password: string;
	email: string;
	apiKey: string;
	apiKeyExpiration: Date;
}

const userSchema: Schema = new Schema({
	userId: { type: String, required: true }, // Make userId required
	username: { type: String, required: true },
	password: { type: String, required: true },
	email: { type: String, required: true },
	apiKey: { type: String, required: true },
	apiKeyExpiration: { type: Date, required: true }, // Add apiKeyExpiration field
});

const User = mongoose.model<UserDocument>('User', userSchema);
export default User;
