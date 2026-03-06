import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date | null;
}

const UserSchema: Schema = new Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Le nom est requis'] 
    },
    email: { 
      type: String, 
      required: [true, 'L\'email est requis'],
      unique: true
    },
    role: { 
      type: String, 
      enum: ['user', 'admin'], 
      default: 'user' 
    }
  },
  {
    timestamps: true 
  }
);

export const User = mongoose.model<IUser>('User', UserSchema);