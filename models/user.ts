import mongoose, { Schema, Model } from 'mongoose'
import bcrypt from 'bcryptjs'
import { User } from '../types/User'

const userSchema: Schema<User> = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [6, 'Your password must be longer than 6 characters'],
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User: Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema)
export default User
