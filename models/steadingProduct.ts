import mongoose, { Schema, Model } from 'mongoose'
import { SteadingProduct } from '../types/SteadingProduct';

const productSchema: Schema<SteadingProduct> = new Schema({
  title: {
    type: String,
    default: 'jars',
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
    type: Number,
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
  total: {
    type: Number,
    default: 0,
  },
  rate: {
    type: Number,
    default: 0,
  },
  categorylist: Array<String>,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const SteadingProduct: Model<SteadingProduct> =
  mongoose.models.SteadingProduct || mongoose.model<SteadingProduct>('SteadingProduct', productSchema)
export default SteadingProduct
