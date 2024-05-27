import mongoose, { Schema, Model } from 'mongoose'
import { Product } from '../types/Product';

const orderSchema: Schema<Product> = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter your title'],
  },
  description: {
    type: String,
  },
  type: {
    type: String,
  },
  category: {
    type: String,
  },
  price: {
    type: String,
    default: 0,
  },
  new: {
    type: Boolean,
    default: true,
  },
  sale: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 10,
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: Array<{
    image_id: Number,
    id: Number,
    alt: String,
    src: String,
  }>,
  qty: {
    type: Number,
    default: 0,
  },
  total: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
  laceType: {
    type: String,
    default: 'HD Lace',
  },
  laceSize: Array<String>,
  destiny: Array<String>,
  length: Array<Number>,
  color: {
    type: String,
    default: 'Natural Color',
  },
  texture: {
    type: String,
    default: 'Body Wave',
  },
  hairType: {
    type: String,
    default: '100% Virgin Human Hair',
  },
  categorylist: Array<String>,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Order: Model<Product> =
  mongoose.models.Product || mongoose.model<Product>('Order', orderSchema)
export default Order
