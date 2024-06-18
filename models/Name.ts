import mongoose, { Document, Model, Schema } from 'mongoose';

interface IName extends Document {
  name: string;
  rating: number;
  gender: string;
}

const NameSchema: Schema<IName> = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  gender: { type: String, default: '' }
});

const Name: Model<IName> = mongoose.models.Name || mongoose.model<IName>('Name', NameSchema);

export default Name;